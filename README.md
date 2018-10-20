# shambles-counter
A simple death counter overlay to import as an HTML source in OBS or XSplit. Control the display of it using your phone or computer.

This runs off a local webpack development server and uses socket.io as a means of communication.

## Project setup
To set up the overlay you must run npm install in two directories. The root (the server) and overlay-counter (the client)
```
npm install
cd overlay-counter
npm install
```
Once installed, you will then be able to start the server.

## Use
To use this application, you must start the server and client up.

### Start the server
Simply run the following command from the project root:

```
npm run start:server
```

Once running, the server will be accessible on localhost:9001 (though there is no need to access it directly)


### Start the client
Simply run the following command from the project root:

```
npm run start:client
```

Once running, the client will be accessible on localhost:8080 (assuming nothing else is running on 8080 already)


### Bring in as a HTML source

Once the client is running, you can then add a new browser source in OBS or XSplit and point it to localhost:8080

Be sure to set the width and height of this source to match the resolution you stream at.

### Controlling the overlay

Once the client is running, you can then visit localhost:8080/dashboard on your computer to control the overlay. Alternatively, connect to your computers IP address on your phone to be able to control your overlay with your phone. Your computers IP address will be shown once you start the client.

Tyically you'll see this:

```
App running at:
- Local: http://localhost:8080
- Network: <YOUR IP HERE>
```

### Notes

At the moment there is no saving of settings so whatever you do in the overlay doesn't persist once you close the browser.

You can however define some settings in the config.json file. These settings are loaded by default.

This can be found in /overlay-counter/public/static/config.json.

Here is an example of a config file also containing milestone notifications.

``` json
{
    "counterInitial": 0,
    "showOnZero": true,
    "labelSingular": "death",
    "labelPlural": "deaths",
    "position": "bottom",
    "alignment": "center",
    "notifications":[
        {
            "target": 5,
            "message": "Wow 5 times",
            "image": "/static/5times.jpg",
            "sound": "/static/5times.mp3"
        }
    ]
}
```

Heres what each property does

* counterInitial: The value the counter should start at once reset
* showOnZero: Sets if the counter should show when it is 0
* labelSingular: The label to display when the counter is 1
* labelPlural: The label to display when the counter is more than 1
* position (top, bottom): Sets where the counter should display on the page.
* alignment (left, center, right): Sets horizontal alignment of the counter
* notifications: When the counter hits a certain value you can pop up a notification.

## Thanks and enjoy

Hopefully this little application is of some use. Either way it was fun making this on stream, if you do end up using it for something be sure to send me a message so I can check it out. You can find me using https://shambles.gg it's got links to all my socials etc. 

It'll be cool to see what you do with this. Anyway enjoy.

