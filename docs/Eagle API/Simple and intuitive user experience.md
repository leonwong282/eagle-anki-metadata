# File Structure Overview

A plugin is an installation package that contains multiple files and can be directly distributed to users.

<pre><code><strong>Plugin
</strong>├─ manifest.json
├─ logo.png
├─ index.html
└─ js
   └─ plugin.js
</code></pre>

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2Fgit-blob-4c0b26edd3a41213207a8b086b7d3e328789be3d%2Fimage%20(11).png?alt=media" alt=""><figcaption></figcaption></figure>

***

## manifest.json <a href="#zqpdi" id="zqpdi"></a>

This is a file that every plugin must have. It contains basic information about the plugin, such as the plugin's name, version, code entry point, etc. There are different configuration methods for different types of plugins. The following is the basic configuration for a "window plugin":

```json
{
    "id": "LB5UL2P0Q9FFF",
    "version": "1.0.0",
    "name": "Hello World",
    "logo": "/logo.png",
    "keywords": ["keywrod1", "keywrod2"],
    "main":
    {
        "devTools": true,
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

* `id` - Plugin ID
* `version` - Plugin Version
* `name` - Plugin Name
* `logo` - Plugin Logo
* `keywords` - Plugin Keyword, In addition to the plugin name, users can also use these keywords to quickly search for the plugin.
* `main` - Plugin Window main entry
  * `url` - Entry Page
  * `width` - Window Width
  * `height` - Window Height

{% hint style="info" %}
**Note**: You can refer to [this article](https://developer.eagle.cool/plugin-api/tutorial/manifest) to learn about all the configuration methods for manifest.json.
{% endhint %}

{% hint style="info" %}
**Example code**:

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Window>
{% endhint %}

## logo.png <a href="#pui04" id="pui04"></a>

The logo field in the manifest.json corresponds to the plugin's icon, which will be used in the plugin list and the plugin center. Please provide an image with a resolution of 128 x 128 pixels. The icon should generally be in PNG format, as PNG provides the best support for transparency.

***

## index.html <a href="#gmbp0" id="gmbp0"></a>

The main field in the manifest.json corresponds to the entry file of the plugin program. When the plugin is executed, index.html will be loaded independently and run in a separate browser window.
