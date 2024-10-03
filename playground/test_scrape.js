document.addEventListener('DOMContentLoaded', async function () {
    console.log('Test started for scraping questions...');

    // Simulate clicking on sections to expand
    const sections = document.querySelectorAll('.section-button-class-name');
    for (const section of sections) {
        section.addEventListener('click', () => {
            const sectionId = section.textContent.trim().toLowerCase().replace(' ', '-');
            document.querySelectorAll('.page-content').forEach(page => page.style.display = 'none');
            document.getElementById(sectionId).style.display = 'block';
        });
    }

    // Execute scraping
    await scrapeQuestions();

    console.log('Test completed.');
});
