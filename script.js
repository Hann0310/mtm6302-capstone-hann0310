document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'yg1B2kHbZRPBb68dospbsYxik9GuKAndhijwv3Uw';
    const apodImage = document.getElementById('apod-image');
    const apodTitle = document.getElementById('apod-title');
    const apodDescription = document.getElementById('apod-description');
    const viewFullImageButton = document.getElementById('view-full-image');
    const downloadImageButton = document.getElementById('download-image');

    // Function to handle viewing full image
    viewFullImageButton.addEventListener('click', function () {
        window.open(apodImage.src, '_blank');
    });

    // Function to handle downloading image
    downloadImageButton.addEventListener('click', function () {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                // Start download
                const downloadLink = document.createElement('a');
                downloadLink.href = data.hdurl || data.url;
                downloadLink.download = 'apod_image.jpg';
                downloadLink.target = '_blank';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {

            apodImage.src = data.url;
            apodTitle.textContent = data.title;
            apodDescription.textContent = data.explanation;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
