import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import mediumToMarkdown from 'medium-to-markdown';
import * as cheerio from 'cheerio';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read JSON file
const readJsonFile = (filePath) => {
  console.log(`Reading JSON file from ${filePath}`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading JSON file from ${filePath}:`, error);
    throw error;
  }
};

// Function to write JSON file
const writeJsonFile = (filePath, content) => {
  console.log(`Writing JSON file to ${filePath}`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  } catch (error) {
    console.error(`Error writing JSON file to ${filePath}:`, error);
    throw error;
  }
};

// Function to convert Medium URL to Markdown
const convertMediumToMarkdown = async (mediumUrl) => {
  console.log(`Converting Medium URL to Markdown: ${mediumUrl}`);
  try {
    const markdown = await mediumToMarkdown.convertFromUrl(mediumUrl);
    return markdown;
  } catch (error) {
    console.error(`Error converting Medium URL to Markdown for ${mediumUrl}:`, error);
    throw error;
  }
};

// Function to extract title from Medium HTML
const extractTitleFromHtml = async (mediumUrl) => {
  console.log(`Extracting title from Medium URL: ${mediumUrl}`);
  try {
    const response = await axios.get(mediumUrl);
    const $ = cheerio.load(response.data);
    return $('title').text().replace(' – Medium', '');
  } catch (error) {
    console.error(`Error extracting title from Medium URL ${mediumUrl}:`, error);
    throw error;
  }
};

// Function to import Medium articles
const importMediumArticles = async () => {
  const articlesFilePath = path.join(__dirname, '../src/lib/data/articles.json');
  console.log(`Importing articles from ${articlesFilePath}`);
  let articlesData;

  try {
    articlesData = readJsonFile(articlesFilePath);
  } catch (error) {
    console.error('Failed to read articles JSON file:', error);
    return;
  }

  for (const article of articlesData) {
    if (article.mediumUrl && !article.imported) {
      try {
        const slug = article.mediumUrl.split('/').pop().split('-').slice(0, -1).join('-') || 'article';
        const title = await extractTitleFromHtml(article.mediumUrl);
        const markdownContent = await convertMediumToMarkdown(article.mediumUrl);

        // Update the article object
        article.title = title;
        article.slug = slug;
        article.tags = []; // Initialize with no tags
        article.imported = true;

        // Write the Markdown file
        const markdownFilePath = path.join(__dirname, `../src/articles/${slug}.md`);
        console.log(`Writing Markdown file to ${markdownFilePath}`);
        fs.writeFileSync(markdownFilePath, markdownContent);
        console.log(`Imported ${slug} to ${markdownFilePath}`);
      } catch (error) {
        console.error(`Error processing article with URL ${article.mediumUrl}:`, error);
      }
    }
  }

  // Write the updated articles data back to the JSON file
  try {
    writeJsonFile(articlesFilePath, articlesData);
    console.log('Successfully updated articles JSON file.');
  } catch (error) {
    console.error('Failed to write updated articles JSON file:', error);
  }
};

// Run the import process
importMediumArticles().catch((error) => {
  console.error('Error importing Medium articles:', error);
});