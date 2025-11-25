# Using Third-Party Modules

## Using the Third-Party Module is.js

Using third-party modules is similar to using native modules; you simply need to import them using the `require()` function.

Taking `is.js` as an example, it is a data type checking library for JavaScript. It provides a set of methods to determine if a variable's data type meets expectations.

First, you need to install the `is.js` module in Node.js using the following command:

```bash
npm install is_js --save
```

{% hint style="warning" %}
Note: The npm package name for is.js is is\_js, with an underscore in the name.
{% endhint %}

After installation, you can use the `is.js` module in your Node.js application process. For example, you can import the `is.js` module and use its functions like this:

```javascript
const is = require('is_js');

if (is.number(x)) {
  console.log('x is a number');
}
else {
  console.log('x is not a number');
}
```

With the `is.js` library, you can easily perform type checks on variables in JavaScript, avoiding errors caused by type mismatches.

If you want to integrate it into the Eagle plugin, here is an example code and its execution result:

```javascript
const is = require('is_js');

eagle.onPluginCreate(() => {
    var x = 1;

    if (is.number(x)) {
        document.write('x is a number');
    } else {
        document.write('x is not a number');
    }
});
```

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2F4opQcFHB7oNAnejI0WOQ%2Fimage.png?alt=media&#x26;token=a032876f-2a0c-4c8f-83c6-455e6a1686b8" alt=""><figcaption><p>Execution result</p></figcaption></figure>

{% hint style="info" %}
The example project above can be obtained [here](https://github.com/eagle-app/eagle-plugin-examples/tree/main/3rd-party)
{% endhint %}

***

## Third-Party Package Management Tool: NPM <a href="#zql65" id="zql65"></a>

npm is the official package management tool for Node.js that provides a convenient way to manage third-party modules and publish your own modules. With npm, you can quickly install modules using the `npm install` command. npm offers powerful module management features to help you better manage project dependencies and module versions, improving development efficiency.

Additionally, npm provides an online module repository where you can search and download third-party modules. Overall, npm is an indispensable tool for Node.js developers, offering a range of practical features to help you better develop and manage your projects.

{% hint style="info" %}
**npm Official Website -** <https://www.npmjs.com/>
{% endhint %}
