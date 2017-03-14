function getGeoIdForState(state){

  if (state =="Alabama") return"01";
  if (state =="Alaska") return"02";
  if (state =="Arizona") return"04";
  if (state =="Arkansas") return"05";
  if (state =="California") return "06";
  if (state =="Colorado") return "08";
  if (state =="Connecticut") return "09";
  if (state =="Delaware") return "10";
  if (state =="District of Columbia") return "11";
  if (state =="Florida") return "12";
  if (state =="Georgia") return "13";
  if (state =="Hawaii") return "15";
  if (state =="Idaho") return "16";
  if (state =="Illinois") return "17";
  if (state =="Indiana") return "18";
  if (state =="Iowa") return "19";
  if (state =="Kansas") return "20";
  if (state =="Kentucky") return "21";
  if (state =="Louisiana") return "22";
  if (state =="Maine") return "23";
  if (state =="Maryland") return "24";
  if (state =="Massachusetts") return "25";
  if (state =="Michigan") return "26";
  if (state =="Minnesota") return "27";
  if (state =="Mississippi") return "28";
  if (state =="Missouri") return "29";
  if (state =="Montana") return "30";
  if (state =="Nebraska") return "31";
  if (state =="Nevada") return "32";
  if (state =="New Hampshire") return "33";
  if (state =="New Jersey") return "34";
  if (state =="New Mexico") return "35";
  if (state =="New York") return "36";
  if (state =="North Carolina") return "37";
  if (state =="North Dakota") return "38";
  if (state =="Ohio") return "39";
  if (state =="Oklahoma") return "40";
  if (state =="Oregon") return "41";
  if (state =="Pennsylvania") return "42";
  if (state =="Rhode Island") return "44";
  if (state =="South Carolina") return "45";
  if (state =="South Dakota") return "46";
  if (state =="Tennessee") return "47";
  if (state =="Texas") return "48";
  if (state =="Utah") return "49";
  if (state =="Vermont") return "50";
  if (state =="Virginia") return "51";
  if (state =="Washington") return "53";
  if (state =="West Virginia") return "54";
  if (state =="Wisconsin") return "55";
  if (state =="Wyoming") return "56";
}


function getRowForState(state){
  //add 2 to pass to matt
  if(state == "Alabama"){return 0;}
  if(state == "Alaska"){return 1;}
  if(state == "Arizona"){return 2;}
  if(state == "Arkansas"){return 3;}
  if(state == "California"){return 4;}
  if(state == "Colorado"){return 5;}
  if(state == "Connecticut"){return 6;}
  if(state == "Delaware"){return 7;}
  if(state == "District of Columbia"){return 8;}
  if(state == "Florida"){return 9;}
  if(state == "Georgia"){return 10;}
  if(state == "Hawaii"){return 11;}
  if(state == "Idaho"){return 12;}
  if(state == "Illinois"){return 13;}
  if(state == "Indiana"){return 14;}
  if(state == "Iowa"){return 15;}
  if(state == "Kansas"){return 16;}
  if(state == "Kentucky"){return 17;}
  if(state == "Louisiana"){return 18;}
  if(state == "Maine"){return 19;}
  if(state == "Maryland"){return 20;}
  if(state == "Massachusetts"){return 21;}
  if(state == "Michigan"){return 22;}
  if(state == "Minnesota"){return 23;}
  if(state == "Mississippi"){return 24;}
  if(state == "Missouri"){return 25;}
  if(state == "Montana"){return 26;}
  if(state == "Nebraska"){return 27;}
  if(state == "Nevada"){return 28;}
  if(state == "New Hampshire"){return 29;}
  if(state == "New Jersey"){return 30;}
  if(state == "New Mexico"){return 31;}
  if(state == "New York"){return 32;}
  if(state == "North Carolina"){return 33;}
  if(state == "North Dakota"){return 34;}
  if(state == "Ohio"){return 35;}
  if(state == "Oklahoma"){return 36;}
  if(state == "Oregon"){return 37;}
  if(state == "Pennsylvania"){return 38;}
  if(state == "Rhode Island"){return 39;}
  if(state == "South Carolina"){return 40;}
  if(state == "South Dakota"){return 41;}
  if(state == "Tennessee"){return 42;}
  if(state == "Texas"){return 43;}
  if(state == "Utah"){return 44;}
  if(state == "Vermont"){return 45;}
  if(state == "Virginia"){return 46;}
  if(state == "Washington"){return 47;}
  if(state == "West Virginia"){return 48;}
  if(state == "Wisconsin"){return 49;}
  if(state == "Wyoming"){return 50;}
  if(state == "USA"){return 51;}
}

function formatStateData(currentStateData){
  var data =[];
  data[0] = {year:1994, value:currentStateData.y1994};
  data[1] = {year:1995, value:currentStateData.y1995};
  data[2] = {year:1996, value:currentStateData.y1996};
  data[3] = {year:1997, value:currentStateData.y1997};
  data[4] = {year:1998, value:currentStateData.y1998};
  data[5] = {year:1999, value:currentStateData.y1999};
  data[6] = {year:2000, value:currentStateData.y2000};
  data[7] = {year:2001, value:currentStateData.y2001};
  data[8] = {year:2002, value:currentStateData.y2002};
  data[9] = {year:2003, value:currentStateData.y2003};
  data[10] = {year:2004, value:currentStateData.y2004};
  data[11] = {year:2005, value:currentStateData.y2005};
  data[12] = {year:2006, value:currentStateData.y2006};
  data[13] = {year:2007, value:currentStateData.y2007};
  data[14] = {year:2008, value:currentStateData.y2008};
  data[15] = {year:2009, value:currentStateData.y2009};
  data[16] = {year:2010, value:currentStateData.y2010};
  data[17] = {year:2011, value:currentStateData.y2011};
  data[18] = {year:2012, value:currentStateData.y2012};
  data[19] = {year:2013, value:currentStateData.y2013};
  return data;
}

function normalizeToAverage(stateData, averageData){
  var data =[];
  data[0] = {year:1994, value:(stateData[0].value - averageData[0].value)};
  data[1] = {year:1995, value:(stateData[1].value - averageData[1].value)};
  data[2] = {year:1996, value:(stateData[2].value - averageData[2].value)};
  data[3] = {year:1997, value:(stateData[3].value - averageData[3].value)};
  data[4] = {year:1998, value:(stateData[4].value - averageData[4].value)};
  data[5] = {year:1999, value:(stateData[5].value - averageData[5].value)};
  data[6] = {year:2000, value:(stateData[6].value - averageData[6].value)};
  data[7] = {year:2001, value:(stateData[7].value - averageData[7].value)};
  data[8] = {year:2002, value:(stateData[8].value - averageData[8].value)};
  data[9] = {year:2003, value:(stateData[9].value - averageData[9].value)};
  data[10] = {year:2004, value:(stateData[10].value - averageData[10].value)};
  data[11] = {year:2005, value:(stateData[11].value - averageData[11].value)};
  data[12] = {year:2006, value:(stateData[12].value - averageData[12].value)};
  data[13] = {year:2007, value:(stateData[13].value - averageData[13].value)};
  data[14] = {year:2008, value:(stateData[14].value - averageData[14].value)};
  data[15] = {year:2009, value:(stateData[15].value - averageData[15].value)};
  data[16] = {year:2010, value:(stateData[16].value - averageData[16].value)};
  data[17] = {year:2011, value:(stateData[17].value - averageData[17].value)};
  data[18] = {year:2012, value:(stateData[18].value - averageData[18].value)};
  data[19] = {year:2013, value:(stateData[19].value - averageData[19].value)};
  return data;
}
