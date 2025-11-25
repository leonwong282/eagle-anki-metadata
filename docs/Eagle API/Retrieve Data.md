# Retrieve Data

You can access various data stored in the Eagle application through methods provided by the Eagle Plugin API, such as `files`, `folders`, `libraries`, etc. Here are some simple examples:

## **Example 1: Get the currently selected file in the application**

```javascript
let selected = await eagle.item.getSelected();
console.log(selected);
```

## **Example 2: Get files by specified conditions**

```javascript
let items = await eagle.item.get({
    ids: [],
    isSelected: true,
    isUnfiled: true,
    isUntagged: true,
    keywords: [""],
    ext: "",
    tags: [],
    folders: [],
    shape: "square",
    rating: 5,
    annotation: "",
    url: ""
});
```

## **Example 3: Get the currently selected folder in the application**

```javascript
let folders = await eagle.folder.getSelected();
```

In addition to the above, the Eagle Plugin API provides many different APIs for getting information. Please click the link below to view the complete information:

* [Library](https://developer.eagle.cool/plugin-api/api/library)
* [Item](https://developer.eagle.cool/plugin-api/api/item)
* [Folder](https://developer.eagle.cool/plugin-api/api/folder)
* [App](https://developer.eagle.cool/plugin-api/api/app)
* [Operating System](https://developer.eagle.cool/plugin-api/api/os)
* [Notification](https://developer.eagle.cool/plugin-api/api/notification)
* [Dialog](https://developer.eagle.cool/plugin-api/api/dialog)
* [Clipboard](https://developer.eagle.cool/plugin-api/api/clipboard)
* [Log](https://developer.eagle.cool/plugin-api/api/log)
