export default `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Stylish Article
% Class File
% Version 2.1 (1/10/15)
%
% This template has been downloaded from:
% http://www.LaTeXTemplates.com
%
% Original author:
% Mathias Legrand (legrand.mathias@gmail.com)
% With extensive modifications by:
% Vel (vel@latextemplates.com)
%
% License:
% CC BY-NC-SA 3.0 (http://creativecommons.org/licenses/by-nc-sa/3.0/)
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\NeedsTeXFormat{LaTeX2e}
\\ProvidesClass{SelfArx}[25/01/2012, v1.0]
\\RequirePackage{ifthen}
\\RequirePackage{calc}
\\AtEndOfClass{\\RequirePackage{microtype}}
\\DeclareOption*{\\PassOptionsToClass{\\CurrentOption}{article}}
\\ProcessOptions*
\\LoadClass{article}
\\RequirePackage{ifpdf}      % Needed to pick between latex and pdflatex

%----------------------------------------------------------------------
%	FONTS
%----------------------------------------------------------------------

\\RequirePackage{times}      % Loads the Times-Roman Fonts
\\RequirePackage{mathptmx}   % Loads the Times-Roman Math Fonts

%----------------------------------------------------------------------
%	VARIOUS USEFUL PACKAGES
%----------------------------------------------------------------------

\\RequirePackage[utf8]{inputenc}
\\RequirePackage{amsmath,amsfonts,amssymb}
\\RequirePackage{graphicx,xcolor}
\\RequirePackage{booktabs}

%----------------------------------------------------------------------
%	MARGINS	
%----------------------------------------------------------------------
	  	  
\\RequirePackage[left=0.5cm,%
right=0.5cm,%
top=1.5cm,%
bottom=3.5cm,%
headheight=12pt,%
letterpaper]{geometry}%
				
				
%----------------------------------------------------------------------
%	PAGE HEADER
%----------------------------------------------------------------------
\\newcounter{tmpcntr}
\\newcommand{\\signatureName}[1]{\\def\\@signatureName{#1}}
\\newcommand{\\signatureTitle}[1]{\\def\\@signatureTitle{#1}}
\\newcommand{\\signature}[1]{\\def\\@signature{#1}}


\\RequirePackage{fancyhdr}  % Needed to define custom headers/footers
\\RequirePackage{lastpage}  % Number of pages in the document
\\pagestyle{fancy}          % Enables the custom headers/footers
% Headers
\\lhead{}%
\\chead{
	\\normalsize\\bfseries\\sffamily\\capitalacute{\\@HeaderTitle}\\linebreak
	\\small\\normalfont\\@HeaderNote
}%
\\rhead{\\small\\sffamily\\bfseries\\thepage/\\pageref{LastPage}}
% Footers
\\lfoot{}%
\\cfoot{\\small\\sffamily\\@FooterNote}%
\\rfoot{
  \\setcounter{tmpcntr}{\\value{page}}
  \\ifnum\\value{tmpcntr}=\\getpagerefnumber{LastPage}
  \\vskip-100pt%
  \\includegraphics[width=0.2\\linewidth]{\\@signature}
  \\small\\normalfont\\@signatureName\\\\
  \\small\\normalfont\\@signatureTitle
  \\fi
}%
\\renewcommand{\\headrulewidth}{3pt}% % No header rule
\\renewcommand{\\footrulewidth}{3pt}% % No footer rule

%----------------------------------------------------------------------
%	SECTION/SUBSECTION/PARAGRAPH SET-UP
%----------------------------------------------------------------------

\\RequirePackage[explicit]{titlesec}
\\titleformat{\\section}
  {\\color{color1}\\large\\sffamily\\bfseries}
  {}
  {0em}
  {\\colorbox{color2!10}{\\parbox{\\dimexpr\\linewidth-2\\fboxsep\\relax}{\\arabic{section}. #1}}}
  []
\\titleformat{name=\\section,numberless}
  {\\color{color1}\\large\\sffamily\\bfseries}
  {}
  {0em}
  {\\colorbox{color2!10}{\\parbox{\\dimexpr\\linewidth-2\\fboxsep\\relax}{#1}}}
  []  
\\titleformat{\\subsection}
  {\\color{color1}\\sffamily\\bfseries}
  {\\thesubsection}
  {0.5em}
  {#1}
  []
\\titleformat{\\subsubsection}
  {\\sffamily\\small\\bfseries}
  {\\thesubsubsection}
  {0.5em}
  {#1}
  []    
\\titleformat{\\paragraph}[runin]
  {\\sffamily\\small\\bfseries}
  {}
  {0em}
  {#1} 
\\titlespacing*{\\section}{0pc}{1ex \\@plus4pt \\@minus3pt}{0pt}
\\titlespacing*{\\subsection}{0pc}{2.5ex \\@plus3pt \\@minus2pt}{0pt}
\\titlespacing*{\\subsubsection}{0pc}{2ex \\@plus2.5pt \\@minus1.5pt}{0pt}
\\titlespacing*{\\paragraph}{0pc}{1.5ex \\@plus2pt \\@minus1pt}{2pt}



%----------------------------------------------------------------------
%	MULTIPLE AUTHOR SET
%----------------------------------------------------------------------  
  
\\newcount\\@authcnt
\\newcount\\@tmpcnt\\@tmpcnt\\z@

\\def\\@affiliation{%
  \\ifnum\\@tmpcnt<\\@authcnt
   \\global\\advance\\@tmpcnt1
    \\raggedright \\csname @auth\\romannumeral\\the\\@tmpcnt\\endcsname\\hfill\\\\%
   \\let\\next\\@affiliation \\vskip1pt
  \\else
   \\let\\next\\relax
  \\fi
\\next}
	 
\\newcommand{\\affiliation}[1]{%
    \\global\\advance\\@authcnt1
    \\expandafter\\gdef\\csname @auth\\romannumeral\\the\\@authcnt\\endcsname
    {#1}}

%----------------------------------------------------------------------
%	LIST CONTROL
%----------------------------------------------------------------------  

\\RequirePackage{enumitem}
%\\setlist{nolistsep} % Uncomment to remove spacing between items in lists (enumerate, itemize)

%----------------------------------------------------------------------
%	ABSTRACT+AUTHOR FRAME
%----------------------------------------------------------------------  

\\newcommand{\\HeaderTitle}[1]{\\def\\@HeaderTitle{#1}}
\\newcommand{\\HeaderNote}[1]{\\def\\@HeaderNote{#1}}
\\newcommand{\\FooterNote}[1]{\\def\\@FooterNote{#1}}

\\newcommand{\\PaperTitle}[1]{\\def\\@PaperTitle{#1}}

\\newcommand{\\Archive}[1]{\\def\\@Archive{#1}}
\\newcommand{\\Authors}[1]{\\def\\@Authors{#1}}
\\newcommand{\\JournalInfo}[1]{\\def\\@JournalInfo{#1}}
\\newcommand{\\Abstract}[1]{\\def\\@Abstract{#1}}
\\newcommand{\\Keywords}[1]{\\def\\@Keywords{#1}}

\\newcommand{\\makeHeader}{
    \\vskip-5pt
    \\begin{center}
      \\sffamily\\bfseries\\fontsize{14}{18}\\selectfont\\@PaperTitle
    \\end{center}
    \\vskip-5pt
}


% Remove brackets from numbering in List of References
\\renewcommand{\\@biblabel}[1]{\\bfseries\\color{color1}\\textsuperscript{[#1]}}
%\\setlength{\\bibitemsep}{0cm}
\\let\\oldbibliography\\thebibliography
\\renewcommand{\\thebibliography}[1]{%
\\addcontentsline{toc}{section}{\\refname}%
\\oldbibliography{#1}%
\\setlength\\itemsep{0pt}}%
`;
