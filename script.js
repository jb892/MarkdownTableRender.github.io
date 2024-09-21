/$$
 $ @Author: Ju Bo
 $ @Date: 2024-09-21 23:27:23
 $ @LastEditTime: 2024-09-21 23:51:24
 $ @LastEditors: Ju Bo
 $ @Description: 
 $ @FilePath: /1_create_pretty_table_website/script.js
 $/
document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdownInput');
    const convertBtn = document.getElementById('convertBtn');
    const tableOutput = document.getElementById('tableOutput');
    const downloadBtn = document.getElementById('downloadBtn');
    const themeSelector = document.getElementById('themeSelector');

    function applyTheme(theme) {
        tableOutput.className = theme;
    }

    function convertTable() {
        const markdown = markdownInput.value;
        const html = marked.parse(markdown);
        tableOutput.innerHTML = html;
        applyTheme(themeSelector.value);

        const table = tableOutput.querySelector('table');
        if (table) {
            downloadBtn.style.display = 'inline-block'; // Make the download button visible
        } else {
            downloadBtn.style.display = 'none'; // Hide the download button if no table is present
        }
    }

    convertBtn.addEventListener('click', convertTable);

    themeSelector.addEventListener('change', () => {
        applyTheme(themeSelector.value);
    });

    downloadBtn.addEventListener('click', () => {
        const table = tableOutput.querySelector('table');
        if (table) {
            // Force repaint
            table.style.display = 'none';
            table.offsetHeight; // Trigger reflow
            table.style.display = '';

            // Add a longer delay before capturing
            setTimeout(() => {
                html2canvas(table, {
                    scale: 2, // Increase resolution
                    backgroundColor: '#ffffff', // White background for a clean look
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'table.png';
                    link.href = canvas.toDataURL();
                    link.click();
                }).catch(error => {
                    console.error('Error capturing table:', error);
                });
            }, 500); // 500ms delay
        }
    });
});