// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  // Grab modal and message
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  // Grab all heart elements
  const hearts = document.querySelectorAll('.like-glyph');

  // Loop through each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      // Toggle heart state while waiting for server response
      const isLiked = heart.textContent === FULL_HEART;
      heart.textContent = isLiked ? EMPTY_HEART : FULL_HEART;
      heart.classList.toggle('activated-heart', !isLiked);

      mimicServerCall()
        .then(() => {
          // If server succeeds, keep the current state
        })
        .catch(error => {
          // If server fails, revert the heart state
          heart.textContent = isLiked ? FULL_HEART : EMPTY_HEART;
          heart.classList.toggle('activated-heart', isLiked);
          
          // Show error modal
          modal.classList.remove('hidden');
          modalMessage.textContent = error;

          // Hide modal after 3 seconds
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
