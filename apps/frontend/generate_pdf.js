const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const mdPath = process.argv[2];
    if (!mdPath) throw new Error("Please provide a markdown file path.");
    
    const pdfPath = mdPath.replace('.md', '.pdf');
    let markdown = fs.readFileSync(mdPath, 'utf8');
    
    // Replace file:/// paths with base64 data URLs to ensure Puppeteer renders them
    markdown = markdown.replace(/file:\/\/\/(C:\/[^\)]+)/gi, (match, filePath) => {
      try {
        const ext = path.extname(filePath).substring(1);
        const data = fs.readFileSync(filePath);
        return `data:image/${ext};base64,${data.toString('base64')}`;
      } catch (err) {
        console.error("Failed to load image:", filePath, err.message);
        return match;
      }
    });

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
            img { max-width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin: 24px 0; display: block; }
            h1 { font-size: 2.2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-bottom: 24px; }
            h2 { font-size: 1.5em; margin-top: 32px; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            h3 { font-size: 1.25em; margin-top: 24px; }
            code { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; background: rgba(175, 184, 193, 0.2); padding: 0.2em 0.4em; border-radius: 6px; font-size: 85%; }
            ul { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
            li { margin-top: 0.25em; }
            strong { font-weight: 600; }
          </style>
        </head>
        <body>
          ${marked.parse(markdown)}
        </body>
      </html>
    `;
    
    console.log("Launching headless browser...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log("Saving PDF...");
    await page.pdf({ 
      path: pdfPath, 
      format: 'A4',
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      printBackground: true
    });
    
    await browser.close();
    console.log('Successfully generated PDF at: ' + pdfPath);
    process.exit(0);
  } catch (error) {
    console.error("Error generating PDF:", error);
    process.exit(1);
  }
})();
