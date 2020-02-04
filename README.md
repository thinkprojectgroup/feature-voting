# feature-voting

feature-voting is a loginless feature voting solution to support decision finding processes. it has been developed by students of the university of applied sciences (HTW) Berlin in 2019/20.

Feature-voting is a loginless web-application that makes it possible for customers and employees of thinkproject to vote for new features and modifications for their software solutions. This way, customers‘ wishes and desires can be determined and implemented. With Analytic Tools, administrators can easily distinguish between customer and employee votes and in addition moderate the content.

### Features

- Create and delete projects
- Create and delete features
- Comment features
- Upvote features and remove upvote
- Admins have to approve new features and comments
- Differentiation between loginless (external) votes and logged in users (internal)

### What is Web-Fingerprinting?

Many people think that their IP-Address is the only thing that can be used to connect their anonymous online activity back to them. However, modern web technologies allow interested organizations to identify and track users across accounts, IP-Addresses, incognito mode, different browsers and more.

Through JavaScript and other APIs available in Browsers, a lot of information can be gathered about the users device. Combine enough of this information, and a fingerprint with about 99.9% uniqueness can be created within a few hundred milliseconds of visiting a website.

### How does it work?

#### HTML5 Canvas Fingerprinting

Drawing the same canvas image on diff erent systems will produce a different result depending on the image processing engine, image export options, compression level, checksum, installed fonts & emojis,  anti-aliasing and other factors of the device that it was drawn on.

#### WebGL Fingerprinting

WebGL provides a lot of interesting device information through two means: WebGL Report: Has  information about the precise capabilities of WebGL inyour Browser (supported extensions, GPU driver, available memory etc.) WebGL Image: Similarly unique to a Canvas image created on your device.

#### More information that can be used

User agent, language, (available) screen size, color depth, platform, IP, location, fonts, touch support, audio fingerprint. There are many possibilities to work against or disrupt your own fi ngerprint. But you should keep in mind, that the more you do the more unique your fingerprint may become.

Since we are not interested in saving all of this device information, we are only storing a hashed representation of the fi ngerprints in our database. This  works  the  same  way  that  companies can save and verify your login password  without  actually  knowing  your password.
