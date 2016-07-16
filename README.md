# Knock-Knock-Server

## Installation

1. npm install
2. create a .env file in the root of the project.  It should contain the following:

```
AWS_IOT_KEY_PATH=[path to your key file]
AWS_IOT_CERT_PATH=[path to your cert file]
AWS_IOT_CA_PATH=[path to your root ca file]
AWS_IOT_CLIENT_ID=[your iot client id]
AWS_REGION=[your AWS region]
```
for example:
```
AWS_IOT_KEY_PATH=/users/me/.symphony/private.pem.key
AWS_IOT_CERT_PATH=/users/me/.symphony/certificate.pem.crt
AWS_IOT_CA_PATH=/users/me/.symphony/root-CA.pem
AWS_IOT_CLIENT_ID=symphony-mac
AWS_REGION=us-east-1
```

## Usage - Run Server

1. npm start
2. Launch browser and go to localhost:3000

## Usage - Run Client
1. No client to run yet

# To connect to a device/module (THE THING)
Plug the USB cable from the device to your machine

1. Run `ls /dev/cu.usb*` to get the usb connection name. For example: `/dev/cu.usbmodem1421`
2. Copy `usbmodem1421` for the tty command
3. Run `screen /dev/tty.usbmodem1421 115200`
4. Login with `chip/chip` for CHIP, `root/intel-edison` for EDISON
5. Viola, you can see the console of the device.
6. To start the chip, `cd [device-name]` (for example `cello-game`), `sudo node index.js`


# Project Progress
## DONE
1. Okta sign-in widget added to login page
2. Button to send open event to AWS mqtt


## TO DO/Issues
1. Implement the authentication
...thoughtworks.okta.com not allowing our domain to use okta login. need to contact okta admin.
...Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://thoughtworks.okta.com/api/v1/authn. (Reason: CORS header 'Access-Control-Allow-Origin' missing).
2. Integrate okta authentication with app authorization
3. Host it somewhere, maybe elastic beanstalk?
4. move certs to CI
5. Maybe someone can make it look nicer :)