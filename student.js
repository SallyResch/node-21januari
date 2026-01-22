console.log("Yo Yo Yo");
const http = require("http");
const url = require("url");
const fs = require("fs");

const navigation = () => {
  return (`<nav>
    <a href="/">Home</a>
    <a href="/student">Student</a>
    <a href="/grades">Grades</a>
    </nav>`)
}

const header = (headerTitle) => {
  return (`<header><h1>${headerTitle}</h1></header>`);
}

const footer = (footerTitle) => {
  return (`<header><h1>${footerTitle}</h1></header>`);
}



http.createServer((req, res) => {
  let address = url.parse(req.url, true);
  const currentPath = address.pathname;
  res.writeHead(200, "All good, Status 200", { "Content-type": "text/html" })

  if (currentPath === "/") {
    res.write(navigation());
    res.write(header("Bestest school"));
    res.write(footer("homeFooter"));
    res.end();
  }
  if (currentPath === "/student") {
    res.write(navigation());
    res.write(header("Hello Student!"));
    fs.readFile("./content/studentDescription.txt", (err, data) => {
      if (err) {
        res.write("Something went wrong");
        res.end();
      } else {
        res.write(data)
      }
      res.write(footer("studentFooter"));
      res.end()
    });
  }

  if (currentPath === "/grades") {
    res.write(navigation());
    res.write(header("Your grades:"));
    fs.readFile("./content/grades.html", (err, data) => {
      if (err) {
        res.write("ERROR");
        return
      } else {
        res.write(data);
      }
      res.write(footer("gradesFooter"));
      res.end()
    });

  }
}).listen(1337, () => console.log("Webserver connected to port 1337"));