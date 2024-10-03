async function scrapeQuestions() {
    console.log('Starting to scrape questions from the form');

    // Select all sections in the sidebar
    const sections = document.querySelectorAll('.form-menu-vertical.hide-print.has-sub-nav-vertical .vertical-nav-content');

    for (const section of sections) {
        // Expand each section to get pages
        section.click();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for dropdown to expand

        // Find pages within the current section
        const pages = section.querySelectorAll('.vertical-nav-mobile-container');
        for (const page of pages) {
            page.click();
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for page content to load

            // Extract questions from the current page
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                const label = input.closest('label') || input.parentElement.querySelector('label');
                if (label) {
                    console.log(`Question: ${label.innerText}`);
                }
            });

            // Extract multiple-choice questions
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                const label = radio.closest('label') || radio.parentElement.querySelector('label');
                if (label) {
                    console.log(`Multiple Choice Question: ${label.innerText}`);
                }
            });
        }
    }
}
