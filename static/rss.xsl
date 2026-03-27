<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #f5f5f5;
            padding: 2rem 1rem;
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
          }
          .header {
            background: #367dcb;
            color: #fff;
            padding: 1.5rem 2rem;
            border-radius: 8px 8px 0 0;
          }
          .header h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
          .header p { opacity: 0.9; font-size: 0.95rem; }
          .notice {
            background: #e8f0fe;
            border-bottom: 1px solid #d0dff2;
            padding: 1rem 2rem;
            font-size: 0.875rem;
            color: #333;
          }
          .notice a { color: #367dcb; }
          .items { background: #fff; border-radius: 0 0 8px 8px; }
          .item {
            padding: 1.25rem 2rem;
            border-bottom: 1px solid #eee;
          }
          .item:last-child { border-bottom: none; }
          .item h2 { font-size: 1.1rem; margin-bottom: 0.25rem; }
          .item h2 a { color: #367dcb; text-decoration: none; }
          .item h2 a:hover { text-decoration: underline; }
          .item .date { font-size: 0.8rem; color: #888; margin-bottom: 0.4rem; }
          .item .description { font-size: 0.9rem; color: #555; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
          </div>
          <div class="notice">
            Это RSS-лента. Скопируйте URL из адресной строки в ваш RSS-ридер, чтобы подписаться.
            <a href="{/rss/channel/link}">Перейти на сайт</a>
          </div>
          <div class="items">
            <xsl:for-each select="/rss/channel/item">
              <div class="item">
                <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
                <div class="date"><xsl:value-of select="pubDate"/></div>
                <div class="description"><xsl:value-of select="description"/></div>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>