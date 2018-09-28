import Bootstrap from "./Bootstrap";
import ErrorPage from "./ErrorPage";
import FrozenHead from "react-frozenhead";
import React from "react";
import SupportStore from "../stores/SupportStore";
import { RouteHandler } from "react-router";
import ga from "react-google-analytics";

ga("create", "UA-62785624-1", "auto");
ga("send", "pageview");

export default class App extends React.Component {
  constructor() {
    super();
    this.state = SupportStore.getState();

    this._onChange = () => {
      this.setState(SupportStore.getState());
    };
  }

  componentDidMount() {
    SupportStore.listen(this._onChange);
  }

  componentWillUnmount() {
    SupportStore.unlisten(this._onChange);
  }

  render() {
    return (
      <html lang="en">
        <FrozenHead>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://file.yhome.pw" />
          <meta
            property="og:title"
            content="文件速递 - 网页点对点传输文件."
          />
          <meta
            property="og:description"
            content="通过浏览器在线传输文件，方便共享."
          />
          <meta
            property="og:image"
            content="https://file.pizza/images/fb.png"
          />
          <title>FilePizza - Your files, delivered.</title>
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <Bootstrap data={this.props.data} />
          <script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js" />
          <script src="/app.js" />
        </FrozenHead>

        <body>
          <div className="container">
            {this.state.isSupported ? <RouteHandler /> : <ErrorPage />}
          </div>
          <footer className="footer">
            <p>
              <script
                id="fb13c4g"
                dangerouslySetInnerHTML={{
                  __html:
                    "(function(i){var f,s=document.getElementById(i);f=document.createElement('iframe');f.src='//api.flattr.com/button/view/?uid=kern&button=compact&url=http%3A%2F%2Fgithub.com%2Fkern%2Ffilepizza';f.title='Flattr';f.height=20;f.width=110;f.style.borderWidth=0;s.parentNode.insertBefore(f,s);})('fb13c4g');"
                }}
              />{" "}
            </p>

          </footer>
          <script>FilePizza()</script>
          <ga.Initializer />
        </body>
      </html>
    );
  }
}
