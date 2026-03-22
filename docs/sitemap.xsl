<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>XML Sitemap — admin.seatable.com</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<style type="text/css">
			body {
				font-family: Helvetica, Arial, sans-serif;
				font-size: 13px;
				color: #545353;
			}
			table {
				border: none;
				border-collapse: collapse;
			}
			#sitemap tr:nth-child(odd) td {
				background-color: #eee !important;
			}
			#sitemap tbody tr:hover td {
				background-color: #ccc;
			}
			#sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
				color: #000;
			}
			#content {
				margin: 0 auto;
				width: 1000px;
			}
			.expl {
				margin: 18px 3px;
				line-height: 1.2em;
			}
			.expl a {
				color: #da3114;
				font-weight: 600;
			}
			a {
				color: #000;
				text-decoration: none;
			}
			a:visited {
				color: #777;
			}
			a:hover {
				text-decoration: underline;
			}
			td {
				font-size: 12px;
				padding: 4px;
			}
			th {
				text-align: left;
				padding-right: 30px;
				font-size: 12px;
			}
			thead th {
				border-bottom: 1px solid #000;
			}
		</style>
	</head>
	<body>
	<div id="content">
		<h1>XML Sitemap</h1>
		<p class="expl">
			This is the XML Sitemap for <a href="https://admin.seatable.com">admin.seatable.com</a>, meant for consumption by search engines.<br/>
			It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
			You can find more information about XML sitemaps on <a href="https://sitemaps.org" target="_blank" rel="noopener">sitemaps.org</a>.
		</p>
		<table id="sitemap" cellpadding="3">
			<thead>
			<tr>
				<th width="75%">URL</th>
				<th width="25%">Last Modified</th>
			</tr>
			</thead>
			<tbody>
			<xsl:for-each select="sitemap:urlset/sitemap:url">
				<xsl:sort select="sitemap:loc" order="ascending"/>
				<tr>
					<td>
						<xsl:variable name="itemURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<a href="{$itemURL}">
							<xsl:value-of select="sitemap:loc"/>
						</a>
					</td>
					<td>
						<xsl:value-of select="sitemap:lastmod"/>
					</td>
				</tr>
			</xsl:for-each>
			</tbody>
		</table>
	</div>
	</body>
	</html>
</xsl:template>
</xsl:stylesheet>
