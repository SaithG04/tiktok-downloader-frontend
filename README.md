
# TikTok Downloader - Frontend

This project is a frontend for a TikTok video downloader application. It allows users to enter a TikTok URL, retrieve available video sources, and download the video in the desired quality.

## Features

- **TikTok URL Validation**: The component validates that the entered URL belongs to TikTok, including short links from `vm.tiktok.com`.
- **Video Source Search**: Once the URL is validated, the frontend sends a request to a backend to retrieve the available video sources.
- **Video Download**: Users can download the video in the quality they prefer, obtaining a `.mp4` file.

## Dependencies

- Angular 15
- RxJS
- HttpClientModule
- FormsModule
- CommonModule

## Setup

To run the frontend, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/SaithG04/tiktok-downloader-frontend.git
cd tiktok-downloader-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
ng serve
```

Visit `http://localhost:4200` in your browser to access the application.

## Usage

1. Enter a TikTok video URL in the input field.
2. Click the "Download" button to fetch the available video sources.
3. Select a video quality from the options provided.
4. Click the "Download" button next to the preferred video quality to start the download.

## Backend

This frontend interacts with a backend API that handles video source extraction and downloading. Make sure to have the backend running on `http://localhost:3000` for the frontend to work correctly.

## Contributing

Feel free to fork this repository, open issues, and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
