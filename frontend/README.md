# 🗝 Around The U.S.

## [Check out this project live!](https://mccambley.github.io/react-around-auth)

## Overview

- ### This project is hub for photos collected during a user's trip **Around the World**! Previously, these photos documented my personal thru-hiking journey along the [Appalachian Trail](https://en.wikipedia.org/wiki/Appalachian_Trail).

- ### After recent updates, connecting the page to to a server with an API, this hub now displays many more photos from users all over the world documenting their own adventures all around the world. This page also allows a user to update their profile and like photos. They can update their name and title via a popup form and they can like photos by clicking the hearts displayed below each photo.

- ### Users can also delete their photos if they so choose. Since all this information is stored in a back-end server the state of the page persists after refresh.
- ### This iteration of "Around the U.S." features authorization and registration features on top of the existing frontend code from previous projects

## Recent Update

- ### All functionality present on the previous version has been implemented using React. This includes the following

  - The ability to update Avatar and user information
  - The ability to add a new card
  - The ability to like and delete cards
  - Deleting a card can only be done on cards own by the user and will only occur after the action is confirmed.
  - Form interface now updates based on whether content is loading or loaded
  - The ability to view cards in their original aspect ratio in a popup
  - Popups can now be closed by clicking outside the content window or pressing Esc.
  - Forms are now validating using the validation API and custom UI

---

## Technologies Used

- **Figma**

  - The layout for this project is based off of a Figma specification sheet designed by another [Practicum by Yandex](https://practicum.yandex.com/). Figma allows designers to put communicate their visions to developers without having to worry about how it will be coded.
  - This design dictates how the page should appear to desktop users and mobile users. Designs for both the how the page upon initial load, as well as the page with the profile editor opened, should appear are displayed. [Check out the design here.](https://www.figma.com/file/SurN1jaeEQIhuZEDMhmWWf/Sprint-4-Around-The-U.S.-desktop-mobile?node-id=0%3A1)

- **Media Queries**

  - In order to create a page that responds to the viewport size through which the user views the page, [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) were put to use. Users viewing the page on screens of all sizes (large desktops, average laptops, iPads, smartphones etc.) will each view a page designed for their individual experience.

- **Javascript**

  - This is the first project that contains any Javascript, which is very exciting. Specifically, this project implements [Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to perform certain actions based on user events. Currently, this project will open an editor when the "edit" button is clicked, it will close the editor without saving if the "X" button, surrounding overlay, or the "Escape" key is actioned when a popup is open, it will save the form values when the "Save" button or the "Enter" key is actioned when the editor is opened, and it will toggle the appearance of the heart when an individual heart is clicked.
  - Recent update adds functionality to the "+" button. Users may now input their own photos from external urls. The title added to the post will automatically set the alt attribute of the image as the value of the title input.
  - Users may now examine each photo in its original aspect ratio by clicked on an image to enlarge it.
  - "Like" and "Delete" functionality has been updated to allow users to interact with both initial posts and subsequently updated posts. In future releases, the state of each "Like" and "Delete" will remain after page refresh. Currently, all input data is erased on page refresh.
  - Forms are validated using Javascript, accessing each inputs ValidityState rather than utilizing the default constraint validation of the users browser

- **Git**

  - While this is invisible to the user, an important addition to this project was the use of a development branch with distinct feature branches implemented on initial page construction. When the page is live, work can still be done and committed in pieces without disturbing the live version of the page. Using branches in this way is real-world development, and the use of them on this individual project is practice for when we begin working on projects with others.

- **ES6 Class Structure**

  - Code has been refactored to incorporate ES6 classes. This refactor will (hopefully) increase readability which will assist with eventual scale increase down the line. Due to the inherent flexibility of ES6 classes, the codebase as a whole is more flexible and the modular structure is well prepared to incorporate more functionality into the page.

- **Webpack**

  - Webpack is a bundling tool that can be used to enhance performance and decrease load times. Webpack features utilized in this project reduce HTML and CSS file sizes, compile many JS modules into one output script, and prepare everything to work across all modern browsers. It's great, and now it's used here.

- **Asynchronous Programming with an Api**

  - At long last this project has been built out to interact with server data.

- **React**
  - React is great. More information on this later as refactoring continues.

### ⚛️ _This React project is an optimized iteration of a [previous project](https://github.com/McCambley/web_project_4)_

---

Around the U.S. project on React, featuring authorization and registration.

This repository will contain your own front-end project on React with added authorization and registration features.
Start working with your previously built front end code from Sprint 11.

All authorization, registration and token requests must go through to the server running on [https://register.nomoreparties.co](https://register.nomoreparties.co/).

Good luck!
