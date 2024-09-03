# Chitpit

Chitpit is a real-time chat application built for seamless and interactive messaging. It leverages Google Firebase's Realtime Database for real-time communication and is designed as a Progressive Web App (PWA). The application includes features like online status indicators, typing notifications, and message validation, all while being fully functional on a static page.

## Features

- **Real-Time Messaging**: Instantly send and receive messages through Firebase's Realtime Database.
- **Online Status Indicators**: Displays real-time online status of users.
- **Typing Status**: Shows when another user is typing.
- **Message Validation**: Ensures that users can only send properly formatted messages.
- **Progressive Web App (PWA)**: Installable on any device, with offline capabilities for a better user experience.
- **Static Page Compatibility**: Fully functional on static pages, making deployment easy and efficient.

## Technologies Used

- **HTML5**: Provides the structure and layout of the application.
- **CSS3**: Ensures a responsive and visually appealing design.
- **JavaScript (ES6)**: Manages client-side interactions such as sending messages, tracking online status, typing status, and validating messages.
- **Google Firebase Realtime Database**: Powers the real-time features, enabling live data synchronization between users.
- **PWA**: Progressive Web App that can be installed on devices and offers offline functionality.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/luckygoswami/chitpit.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chitpit
   ```

3. Set up Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Set up Firebase Realtime Database and Authentication.
   - Replace the Firebase configuration in `script.js` with your own credentials.

4. Open the `index.html` file directly in your browser to start the chat application.

## Usage

- After setting up Firebase, simply open the `index.html` file in your browser to access the chat interface.
- To test online and typing status, open the application in multiple tabs or browsers.
- Install the application on your device as a PWA for a better user experience.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

_Made with 🧠 by LuckyGoswami_
