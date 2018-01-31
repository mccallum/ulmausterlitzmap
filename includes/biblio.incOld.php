#! /usr/local/bin/php5
<?php
include 'vars.php';
  $content = file_get_contents($datasource . '/pagecontent/bib');

?>

<div class="inner-border-left"></div>
<div class="inner-border-right"></div>
<div class="topPadding">&nbsp;</div>

<div id="filter-wrapper"><a href="#"><span class="close"></span></a>
<div id="filter-title"><h1>Bibliography</h1></div>

<div id="bibliography-content">
	<!--
<p>The 1805 campaign was selected for this project because of the ready availability of a wide range of documentary materials. Much of the factual information necessary to plot units on the daily maps was obtained from published primary sources, the most important of which were for French armies the various volumes of P.-C. Alombert and J. Colin, <em>La Campagne de 1805 en Allemagne</em> (Paris: Librairie militaire R. Chapelot, 1902-1908); and for Austrian forces, Alfred Krauss, <em>1805: Der Feldzug von Ulm</em> (Wien: Seidel, 1912).</p>

<p>The literature on Napoleon and the Napoleonic wars is voluminous and I make no claim to having made even a partial survey of it. For this project, I have relied heavily on the excellent study of Frederick W. Kagan, <em>The End of the Old Order</em>, vol. 1, <em>Napoleon and Europe 1801-1805</em> (Da Capo Press, 2006). In addition to the works listed below, I have especially found useful Charles Esdaile, <em>Napoleon’s Wars: An International History, 1803-1815</em> (Penguin Books, 2007); Paul Schroeder, <em>The Transformation of European Politics, 1763-1848</em> (Oxford: Clarendon Press, 1994); Georges Lefebvre, <em>Napoleon: From 18 Brumaire to Tilsit 1799-1807)</em> (New York: Columbia University Press, 1969); and Rory Muir, <em>Tactics and the Experience of Battle in the Age of Napoleon</em> (Yale University Press, 1998). For reference I have employed David G. Chandler, <em>Dictionary of the Napoleonic Wars</em> (New York: Macmillan, 1979); and David G. Chandler, <em>Napoleon’s Marshals</em> (London: Weidenfield and Nicolson, 1987). Data for battles has been taken from Digby Smith, <em>The Greenhill Napoleonic Wars Data Book</em> (London: Greenhill Books; Mechanicsburg, PA: Stackpole Books, 1998).</p>

<p>For those looking for a shorter account of the campaign than that found in Kagan, a good place to begin is David Chandler, <em>The Campaigns of Napoleon</em> (New York: Scribner, 1966). For recent introductions to the broader literature, see Alexander Grab, <em>Napoleon and the Transformation of Europe</em> (Palgrave Macmillan, 2003) and Geoffrey Ellis, <em>The Napoleonic Empire</em> (London: Macmillan, 1991). For the older literature, see the bibliography in the work by Georges Lefebvre cited above.</p>


<h3>Published Primary Materials Consulted</h3>
<ul>
<li>Alombert, P.-C., and J. Colin, <em>La Campagne de 1805 en Allemagne</em>. 6 Vols. Paris: Librairie militaire R. Chapelot, 1902-1908.</li>

<li>Auriol, Charles. <em>La France, l’Angleterre et Naples de 1803 à 1806</em>. 2 Vols. Paris: Plon-Nourrit, 1904-1905.</li>

<li>Bonaparte, Napoléon. <em>Correspondance générale</em>, vol. 5. <em>Boulogne, Trafalgar, Austerlitz 1805</em>. Ed. Michel Kerautret and Gabriel Madec. Paris: Fayard, 2008. </li>

<li>Davout, Louis Nicolas. <em>Correspondance du Maréchal Davout, Prince d’Eckmühl: ses commandements, son ministère, 1801-1815</em>. 4 Vols. Ed. Charles de Mazade. Paris: Plon, 1885.</li>

<li>Derrécagaix, Général [Victor Bernard]. <em>Le Lieutenant-Général Comte Belliard, chef d’état-major de Murat</em>. Paris: Librairie militaire R. Chapelot, 1909.</li>

<li>Derrécagaix, Général [Victor Bernard]. <em>Le Maréchal Berthier, Prince de Wagram et de Neuchatel</em>, part 2, <em>1804-1815</em>. Paris: Librairie militaire R. Chapelot, 1905.</li>

<li>Despréaux, Frignet. <em>Le Maréchal Mortier, duc de Trévise</em>, vol. 3, <em>1804-1807</em>. Paris and Nancy: Berger-Levrault, 1920.</li>

<li>Ermolov, A P, and V A. Fedorov. Zapiski A.P. Ermolova, 1798-1826. Moskva: "Vysshaiashkola", 1991.</li>

<li>Fairon, Emile and Henri Heuse. <em>Lettres de Grognards</em>. Liége: Imprimerie Bénard; Paris: Librairie Georges Courville, 1936.</li>

<li>Garnier, Jacques, ed. <em>Relations et rapports officiels de la bataille d’Austerlitz 1805</em>. La Vouivre, 1998.</li>

<li>Golubov, Sergei, and F. E. Kuznetsov. General Bagration: sbornik dokumentov i materialov. Leningrad: OGIZ, 1945.</li>

<li>Koch, Jean Baptiste. <em>Mémoires de Massena: rédigés d’après les documents qu’il a laissés et sur ceux depot de la guerre et du depot des fortifications</em>. 7 Vols. Paris: Paulin et Lechaevalier, 1848-1850.</li>

<li>Kutuzov, Mikhail I, and N Korobkov. Felʹdmarshal Kutuzov: Sbornik Dokumentov I Materialov. Moskva: Gos. izd-vo polit. lit-ry, 1947.</li>

<li>Krauss, Alfred. <em>1805: Der Feldzug von Ulm</em>. Wien: Seidel, 1912. </li>

<li>Marmont, duc de Raguse. <em>Mémoires du duc de Raguse de 1792 à 1832</em>. 3rd Ed. Paris: Perrotin, 1857.</li>

<li>Savary, duc de Rovigo. <em>Mémoires du duc de Rovigo pour server à l’histoire de l’Empereur Napoléon</em>. Paris: A. Bossange, 1828.</li>
</ul>

<h3>Secondary Materials Consulted</h3>

<ul>
<li>Bowden, Scott. <em>Napoleon and Austerlitz: An Unprecedentedly Detailed Combat Study of Napoleon’s Epic Ulm-Austerlitz</em>. Chicago, IL: The Emperor’s Press, 1997.</li>

<li>Burton, Reginald. <em>From Boulogne to Austerlitz, Napoleon’s campaign of 1805</em>. London: G. Allen, 1912. </li>

<li>Castle, Ian. <em>Austerlitz: Napoleon and the Eagles of Europe</em>. Barnsley: Pen and Sword, 2005.</li>

<li>Chandler, David G. <em>The Campaigns of Napoleon</em>. New York: Scribner, 1966.</li>

<li>Chandler, David G. <em>Dictionary of the Napoleonic Wars</em>. New York: Macmillan, 1979.</li>

<li>Chandler, David G. <em>Napoleon’s Marshals</em>. London: Weidenfield and Nicolson, 1987.</li>

<li>Connelly, Owen. <em>Napoleon’s Satellite Kingdoms</em>. New York: Free Press, 1965.</li>

<li>Duffy, Christopher. <em>Austerlitz 1805</em>. Hamdem, CN: Archon Books, 1977.</li>

<li>Ellis, Geoffrey. <em>The Napoleonic Empire</em>. London: Macmillan, 1991.</li>

<li>Englund, Steven. <em>Napoleon: A Political Life</em>. Cambridge, MA: Harvard University Press, 2004.</li>

<li>Esdaile, Charles. <em>Napoleon’s Wars: An International History, 1803-1815</em>. Penguin Books, 2007.</li>

<li>Flayhard, William Henry. <em>Counterpoint to Trafalgar: The Anglo-Russian Invasion of Naples, 1805-1806</em>. Columbia, SC: University of South Carolina Press, 1992.</li>

<li>Garnier, Jacques. <em>Austerlitz: 2 décembre 1805</em>. Paris: Fayard, 2005.</li>

<li>Goetz, Robert. <em>1805, Austerlitz: Napoleon and the Destruction of the Third Coalition</em>. London: Greenhill; Mechanicsburg, PA: Stackpole Books, 2005.</li>

<li>Grab, Alexander. <em>Napoleon and the Transformation of Europe</em>. Palgrave Macmillan, 2003.</li>

<li>Kagan, Frederick. <em>The End of the Old Order: Napoleon and Europe, 1801-1805</em>. Da Capo Press, 2006.</li>

<li>Lachouque, Henry. <em>The Anatomy of Glory: Napoleon and his Guard</em>. Trans. Anne S. K. Brown. Providence, RI: Brown University Press; London: Lund Humphries, 1961.</li>

<li>Lefebvre, Georges. <em>Napoleon: From 18 Brumaire to Tilsit 1799-1807)</em>. Trans. Henry F. Stockhold. New York: Columbia University Press, 1969.</li>

<li>Lentz, Thierry. <em>Nouvelle histoire du Premier Empire</em>, vol 1, <em>Napoléon et la conquête de l’Europe 1804-1810</em>. Fayard: Paris, 2002.</li>

<li>Manceron, Claude. <em>Austerlitz: The Story of a Battle</em>. Trans. George Unwin. New York: Norton, 1966.</li>

<li>Maude, F. N. <em>The Ulm Campaign, 1805</em>. London: G. Allen, 1912.</li>

<li>Muir, Rory. <em>Tactics and the Experience of Battle in the Age of Napoleon</em>. Yale University Press, 1998.</li>

<li>Schneid, Frederick C. <em>Napoleon’s Conquest of Europe: The War of the Third Coalition</em>. Westport, CN; London: Praeger, 2005.</li>

<li>Schneid, Frederick C. <em>Napoleon’s Italian Campaigns: 1805-1815</em>. Westport, CN: Praeger, 2002.</li>

<li>Schroeder, Paul. <em>The Transformation of European Politics, 1763-1848</em>. Oxford: Clarendon Press, 1994.</li>

<li>Smith, Digby. <em>The Greenhill Napoleonic Wars Data Book</em> (London: Greenhill Books; Mechanicsburg, PA: Stackpole Books, 1998.</li>

<li>Thoumas, Charles. <em>Maréchal Lannes</em>. Paris: Calmann Lévy, 1891.</li>

<li>Vachée, Jean Baptiste. <em>Napoléon en champagne</em>. Paris: Berger-Levrault, 1913.</li>

<li>Woolf, Stuart. <em>Napoleon’s Integration of Europe</em>. New York and London: Routledge, 1991.</li>
</ul>
-->
<?php
  echo $content;

?>
</div>

</div>
