# JSON Web Tokens

JSON Web Tokens (=JWT) is another authentication type SeaTable provides. It is used by the SeaTable API but it can also be used to allow server-to-server authentication. JWTs are used for example if you switch from (SeaTable Cloud)[https://cloud.seatable.io] to the (team administration)[https://account.seatable.io] without the need to re-authenticate. 

## What is JWT?

JWT is a very popular technology but comes with its share of controversy. Some say you should never use it. Others say JWT authentication is amazing. We think that JWT can be very helpful in some specific scenarios.
If you want to know more aboout JWT, please read [this article](https://blog.logrocket.com/jwt-authentication-best-practices/). 

Here is a short introduction into JWT:

- JWT is an encoded and cryptographically signed URL, that contains an json object.
- This json object can contain any kind and amount of data. 
- When a server receives this JWT it can guarantee the data it contains can be trusted because it's signed (not encrypted).
- Both parties (sender and receiver) must know a shared secret that is used to sign the JWT request.

## How to configure and use JWT?

To enable the login with JWTs you have to define a secret key in your `dtable_web_settings.py` and restart the SeaTable service:
```
SSO_SECRET_KEY = 'your-shared-secret-like-a38B232XQJLx392871#2DEF_dowfWE#_39dwefidWFwLw39fDFEF='
```

Afterwards SeaTable allows the login with the following URL `https://cloud.seatable.io/sso-auto-login/?token=...`. 

The token is the encoded json object with these elements:

```json
{
    "exp": "1682582542",
    "user_id": "b7bd00e840a14b748ce2bffdf409488b@auth.local"
}
```

## Examples how to use JWT and generate the login-link

Every programming language offers libraries to sign JWTs. A good place to start looking for such a library is (https://jwt.io/libraries)[https://jwt.io/libraries].

Here is an example with PHP and the (firebase-library)[https://github.com/firebase/php-jwt]:

```php
// This code generates an URL to login as the user defined in user_id.
// The URL is valid for 30 seconds.
// After successful login, the user jumps to $url_next. 

$url_next = "/"
$jwt_signing_key = "your-shared-secret"
$payload = [
    "exp" => time() + 30,
    "user_id" => "b7bd00e840a14b748ce2bffdf409488b@auth.local",
];
$jwt = \Firebase\JWT\JWT::encode($payload, $jwt_signing_key, 'HS256');
$jwt_url = 'https://cloud.seatable.io/sso-auto-login/?token='. rawurlencode($jwt) . $url_next;
echo $jwt_url;
```

Other examples can be found here:

- [Vue and Node.js](https://blog.logrocket.com/how-to-implement-jwt-authentication-vue-nodejs/)
- [Python](https://medium.com/@apcelent/json-web-token-tutorial-with-example-in-python-df7dda73b579)