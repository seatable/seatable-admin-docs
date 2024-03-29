#!/bin/bash

# Older mariadb containers didn't include a local healthcheck user. The container stays `unhealthy` after you execute `docker compose up -d`.
# This script will create the necessary healthcheck user in the database and create a file with the credentials.
# If you followed the default installation method described in manual.seatable.io, you don't have to change the following variables.

echo ""
echo "Let's create the healthcheck user in the database..."

if ! which pwgen >/dev/null 2>&1; then
    echo "> It seems that pwgen is not installed. Please install this software first."
fi

PATH_ENV_FILE=/opt/seatable-compose/.env
CONTAINER_NAME=mariadb
CONTAINER_DATADIR=/opt/mariadb
HEALTHCHECK_PASS=`pwgen 20 1`

echo "> The password for this healthcheck user will be '${HEALTHCHECK_PASS}'. You don't have to save this password if everything goes right."

echo "> I try to get the SEATABLE_MYSQL_ROOT_PASSWORD from your .env file."
source /opt/seatable-compose/.env
echo "> Your SEATABLE_MYSQL_ROOT_PASSWORD is '${SEATABLE_MYSQL_ROOT_PASSWORD}'."

echo "> I try to create the healthcheck user in the database."
CHECK_USER=$(docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "SELECT * FROM mysql.user WHERE user = 'healthcheck';")

if [ $? -eq 1 ]; then
  echo "> I have a problem: it seems that the container is either not running or I can not write the user in the database."
  echo "> Script not successful."
  exit 1
fi

if [ -z "${CHECK_USER}" ]; then
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "CREATE USER 'healthcheck'@'127.0.0.1' IDENTIFIED BY '${HEALTHCHECK_PASS}';" && \
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "GRANT USAGE ON *.* TO 'healthcheck'@'127.0.0.1';" && \
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "CREATE USER 'healthcheck'@'::1' IDENTIFIED BY '${HEALTHCHECK_PASS}';" && \
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "GRANT USAGE ON *.* TO 'healthcheck'@'::1';" && \
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "CREATE USER 'healthcheck'@'localhost' IDENTIFIED BY '${HEALTHCHECK_PASS}';" && \
    docker exec ${CONTAINER_NAME} mysql -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} -e "GRANT USAGE ON *.* TO 'healthcheck'@'localhost';"
    echo "> I created the healthcheck user in the database."
else
    echo "> There is already a healthcheck user in the database. Check if ${CONTAINER_DATADIR}/.my-healthcheck.cnf exists."
fi

if [ -e ${CONTAINER_DATADIR}/.my-healthcheck.cnf ]; then
    echo "> I have a problem: it seems that there is already a file with the healthcheck credentials at ${CONTAINER_DATADIR}/.my-healthcheck.cnf. I will not overwrite this..."
    echo "> Script not successful."
    exit 1
else
    echo "> I write the .my-healtcheck.cnf file now."
    echo "[mariadb-client]" > ${CONTAINER_DATADIR}/.my-healthcheck.cnf
    echo "port=3306" >> ${CONTAINER_DATADIR}/.my-healthcheck.cnf
    echo "socket=/run/mysqld/mysqld.sock" >> ${CONTAINER_DATADIR}/.my-healthcheck.cnf
    echo "user=healthcheck" >> ${CONTAINER_DATADIR}/.my-healthcheck.cnf
    echo "password=${HEALTHCHECK_PASS}" >> ${CONTAINER_DATADIR}/.my-healthcheck.cnf
    echo "protocol=tcp" >> ${CONTAINER_DATADIR}/.my-healthcheck.cnf
fi

echo "> FINISH SUCCESSFUL. Your container should become healthy now."