---
status: new
---

# Security measures

Security is more than just activating a function or implementing a web-application firewall. Security is an ongoing process with a holistic view on all relevant topics. We try to define sinnvolle default values implementing best practies to improve the security without creating to many restrictions that might produce problems with some older clients.

## Web-Security

Due to the fact that SeaTable is a mainly used via the browser, we took quiet some effort to implement good security measures. HTTPS is mandatory by default, modern ciphers are required and we enforce some security headers to prevent against typical script kiddies attacks.

This configuration approach delivers good results, that are confirmed by known security experts in the internet:

- A+ from [https://www.ssllabs.com/](https://www.ssllabs.com/ssltest/analyze.html?d=cloud.seatable.io)
- A from [https://securityheaders.com/](https://securityheaders.com/?q=https%3A%2F%2Fcloud.seatable.io)
- 100% from [internet.nl](https://internet.nl/site/cloud.seatable.io/)
- 80/100 or B+ from [https://observatory.mozilla.org/](https://observatory.mozilla.org/analyze/cloud.seatable.io)

## Network security

SeaTable's architecture encompasses a constellation of services and containers, each fortified with robust security measures. Our approach emphasizes the publication of only a singular service to the internet, strategically limiting the attack surface.

Complementing this, network segmentation is rigorously enforced, ensuring containers are cordoned off from one another and allowing only vital communication within the ecosystem. In meticulous detail, we've established distinct networks: one tailored for containers necessitating public accessibility and another reserved for internal, non-public traffic.

This meticulous design ensures a fortified defense posture, shielding SeaTable's infrastructure from potential threats while safeguarding the integrity of its operations.

## Security scans and vulnerabilities

Ensuring security in CI deployment is paramount for us. This entails maintaining strict control over our deployment pipeline, implementing rigorous linting and code formatting checks, and conducting automatic testing with CVE vulnerability scanners. These measures collectively contribute to the generation of up-to-date container images, safeguarding our infrastructure against potential vulnerabilities.

## Documentation, Support and source code

While it's true that any software product can simply be run, that approach doesn't align with our philosophy. Our mission is to create the world's leading self-hosted no-code database and app building platform. In pursuit of this goal, we prioritize several key components:

- Comprehensive documentation to empower users at every step.
- A responsive and knowledgeable support team to swiftly address any inquiries or issues.
- Availability of the source code, with exceptions made only to protect our intellectual property.

By adhering to these principles, we aim to provide a seamless and empowering experience for our users, fostering innovation and creativity in their projects.
