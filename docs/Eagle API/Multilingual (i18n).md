# Multilingual (i18n)

The Eagle plugin has a built-in i18next module, making it easy for developers to create plugins that support multiple languages. i18next is a JavaScript library for multilingual applications, which can easily handle multilingual translations, and provides support for various translation methods, including custom translations, localization, and multi-language support.

Below we will walk you through how to make your plugin support multiple languages:

## Step 1: Create the `_locales` folder

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2Fgit-blob-569807c86a1c45f8575718fb2d6ba12d5de015c9%2Fimage%20(19)%20(1).png?alt=media" alt=""><figcaption></figcaption></figure>

## Step 2: Create language `.json` files

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2FBUvYim43D84nY7NnPlBI%2Fimage.png?alt=media&#x26;token=3d752173-a1c1-45cd-b17d-e7843f1fee71" alt=""><figcaption></figcaption></figure>

{% tabs %}
{% tab title="\_locales/en.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "i18n example"
        }
    },
    "contextMenu": {
        "copy": "Copy",
        "paste": "Paste"
    }
}
```

{% endtab %}

{% tab title="\_locales/zh\_CN.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "Multilingual example"
        }
    },
    "contextMenu": {
        "copy": "复制",
        "paste": "粘贴"
    }
}
```

{% endtab %}

{% tab title="\_locales/zh\_TW\.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "Multilingual example"
        }
    },
    "contextMenu": {
        "copy": "複製",
        "paste": "貼上"
    }
}
```

{% endtab %}

{% tab title="\_locales/ja\_JP.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "i18n の例"
        }
    },
    "contextMenu": {
        "copy": "コピー",
        "paste": "ペース"
    }
}
```

{% endtab %}
{% endtabs %}

{% hint style="info" %}
Currently supported languages are `en`, `ja_JP`, `es_ES`, `de_DE`, `zh_TW`, `zh_CN`, `ko_KR`, `ru_RU`.
{% endhint %}

## Step 3: Adjust `manifest.json`

Using Eagle Plugin's `i18next` feature, you can define translations for multilingual applications with simple JSON files.

```json
{
    "id": "LE564883T24ZR",
    "version": "1.0.0",
    
    // 1. Adjust the name
    "name": "{{manifest.app.name}}",
    "logo": "/logo.png",
    "keywords": [],
    
    // 2. Set supported languages and default language
    "fallbackLanguage": "zh_CN",
    "languages": ["en", "zh_TW", "zh_CN", "ja_JP"],
    
    "main": {
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

## Step 4: Replace strings used in the code

Adjust plugin.js, use i18next method to get strings and perform alert

{% code title="plugin.js" %}

```javascript
eagle.onPluginCreate((plugin) => {

    // Get multilingual fields
    let copyText = i18next.t('contextMenu.copy');
    let pasteText = i18next.t('contextMenu.paste');

    document.querySelector('#message').innerHTML = `
    <ul>
        <li>Language: ${eagle.app.locale}</li>
        <li>Copy: ${copyText}</li>
        <li>Paste: ${pasteText}</li>
    </ul>
    `;
});
```

{% endcode %}

## Step 5: Switch application language and check the modification results

You can change the language settings of Eagle software by following these steps: Find and click the "Eagle" button on the screen, then select "Preferences", click "Common", and finally modify the "Language" section.

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2Fd8A9rC3ZEsX62e1XDE3v%2Fimage.png?alt=media&#x26;token=4637cc4a-4546-4fd9-a1d4-2c184a71fe75" alt=""><figcaption><p>Switch application language</p></figcaption></figure>

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2Fgit-blob-a32e2c55e65473ae04516b88f980c83fc620a3ba%2Fimage%20(20)%20(1).png?alt=media" alt=""><figcaption></figcaption></figure>

<figure><img src="https://1590693372-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F8ag8XBIM3olHOU7WmBBx%2Fuploads%2Fgit-blob-cb19a0370eaf4f0da654e55033aeda93aa49c713%2Fimage%20(16).png?alt=media" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
**Complete Example Code:**

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/i18n>
{% endhint %}

## Learn Advanced Usage

i18next has many convenient methods that allow us to easily cope with various translation scenarios. To ensure brevity, only the core usage methods are explained here. If you need to learn more about i18next usage and advanced techniques, it's recommended to read the following links:

* i18next Official Documentation: <https://www.i18next.com/overview/getting-started>
* i18next GitHub Repository: <https://github.com/i18next/i18next>

By reading the official documentation, you can understand the basic concepts and usage of i18next and find some example code to help you get started using it. The GitHub repository contains the source code and more documentation of i18next. If you want to further understand its implementation details, you can check it out there.
