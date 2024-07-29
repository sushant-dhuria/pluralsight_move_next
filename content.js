console.log("Content script loaded");

function findAndClickButtons() {
  console.log("Initializing code");

  // Check if the current URL ends with /summary
  if (window.location.href.endsWith('/summary')) {
    console.log("URL ends with /summary");

    // Find all buttons on the page
    const buttons = document.querySelectorAll('button');
    console.log(`Found ${buttons.length} buttons on the page`);

    buttons.forEach(button => {
      const buttonText = button.textContent.trim();
      console.log(`Button found with text: ${buttonText}`);

      if (buttonText.startsWith('Start module')) {
        console.log("Button text matches 'Start module'. Attempting to click the button.");
        button.click();
        console.log("Button clicked");
      }
    });
  } else {
    console.log("URL does not end with /summary");
  }
}

function startObserving() {
  // Use MutationObserver to handle dynamically added elements
  const observer = new MutationObserver(() => {
    findAndClickButtons(); // Call the function to check for buttons

    // Optionally stop observing after finding buttons
    // observer.disconnect();
  });

  // Start observing the document body for added/removed nodes
  observer.observe(document.body, { childList: true, subtree: true });

  // Perform an initial check
  findAndClickButtons();
}

// Execute code based on the document's ready state
if (document.readyState !== 'loading') {
  console.log('Document is already ready, executing code now');
  startObserving();
} else {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Document was not ready, code is executed now');
    startObserving();
  });
}
