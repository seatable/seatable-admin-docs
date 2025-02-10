<?php

declare(strict_types=1);

if (count($argv) != 2) {
    echo "Usage: $argv[0] <FILENAME>";
    exit(1);
}

$orange_codes = '/#(ff8000|ED7109|ed7109|ff6700|c60|bf6000|d96d00|20a0ff|E16C0A|feab79)/';
$rgba_codes = '/(rgba\(255,128,0|rgba\(255,147,35|rgba\(255,147,38)/';
$final_css = array();
$placeholder = '##maincolor##';

// Datei als Array eingelesen
$array = explode("}", file_get_contents($argv[1]));
$last = count($array)-1;

foreach($array as $key => $value){

  $inside = "";

  // verschachtelte zusammenführen
  if ( substr_count($value, "{") > 1 ){
    $inside = "y";
    $inside_start = $key;
    $inside_ende = $key;
  }
  if ( trim($value) == "" AND $inside == "y" ){
    $inside_ende = $key;
    while($inside_start < $key){
      $array[$key] = trim($array[$key] ."\n". $array[$inside_start] ."}");
      unset($array[$inside_start]);
      $inside_start++;
    }
    $inside = "n";
    $value = $array[$key];
  }

  if( $inside != "y" ){
    $array[$key] = trim($value."}");
  }
}

// clean last element
if ( trim($array[$last]) == "}" ) {
  unset($array[$last]);
}

// Array-Index wieder neu aufbauen
$array = array_values($array);

//print_r($array);


// 1. save code-block only if it contains a "#..."

foreach($array as $key => $value){
  if( preg_match($orange_codes, $value) OR preg_match($rgba_codes, $value) ){

    // 2. replace orange code with placehoder
    $tmp = str_replace(["\r", "\n"], '', preg_replace($rgba_codes, 'rgba(##mainrgba##', preg_replace($orange_codes, $placeholder, trim($value))));
    //$tmp = $tmp.'}';

    $final_css[] = $tmp;
  }
}

// implode array
$final_css_string = implode("\n",$final_css);

// jede Zeile durchgehen und alles entfernen, was kein . { } oder # enthält:

$final_css_linebyline = explode("\n", $final_css_string);
foreach($final_css_linebyline as $key => $value){
  if( !preg_match('/\.[a-zA-Z]|{|}|#/', $value) ){
      unset($final_css_linebyline[$key]);
  }
}
$final_css_linebyline = array_values($final_css_linebyline);
$final_css_string2 = implode("\n",$final_css_linebyline);

// Save to file
file_put_contents($argv[1], $final_css_string2);
