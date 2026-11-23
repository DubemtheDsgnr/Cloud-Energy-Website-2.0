# Cloud-Energy-Website-2.0
A redesign of the Cloud Energy Solutions website (cloudenergy.com.ng), a Nigerian solar, inverter and battery company. Built mobile first with colours from the brand logo, clearer navigation, stronger trust signals and simple paths to energy audits, SEPP financing, services and partnerships. Product Design by Ifedubem Ezike (DubemtheDsgnr).

## What is in this folder

* `index.html`: the page shell and all styles
* `app.js`: page templates, navigation and interactions
* `data.js`: the product catalogue (categories, models, specs)
* `blog.js`: blog articles
* `img/`: photos, product images, leadership portraits and the Cloud Ride video (`img/ev/ride.mp4`)
* `pdf/`: product datasheets, user guides, installation guides and warranties (196 files)

It is a static site with no build step. Pages are routed with the address hash, for example `#products`, `#cloud-ride`, `#financing` and `#about`.

## Run it locally

Open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000. Opening `index.html` directly from disk also works in most browsers, but PDF downloads need a local server.

## Publish on GitHub Pages

1. Create a new repository on GitHub.
2. Push the contents of this folder to the repository root (GitHub Desktop or `git push` is easiest, because the folder has more than 100 files, which is more than the GitHub web uploader accepts at once).
3. In the repository, open Settings, then Pages, and set the source to the `main` branch, root folder.
4. The site will be live at `https://<your-username>.github.io/<repository-name>/`.

The `.nojekyll` file tells GitHub Pages to serve the files as they are.

## Things to update before launch

* **Cloud Ride website link:** set `RIDE_SITE` near the top of the Cloud Ride section in `app.js`. Every category button will link to it.
* **eShop links:** product to eShop page mappings are in `ESHOP_P` in `app.js`. 14 products currently link to their eShop category.
* **Forms:** contact, quote and newsletter forms ask visitors to copy their details and email info@cloudenergy.com.ng. Connect them to a form service or backend to receive submissions directly.
