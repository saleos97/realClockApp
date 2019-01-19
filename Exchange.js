import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Platform, Button, Image, ImageBackground, ScrollView } from 'react-native';
import { Container, Header, Tabs, Tab, Content, ListItem, Left, Right, Switch, Icon, Body, List } from 'native-base';

export default class Exchange extends React.Component {

  constructor(props) {
    super(props)

    this.state = { amount: '', rates: [], firstValue: '', secondValue: '', result: '', resultDisplay: '' }
  };

  calculate = () => {
    if (this.state.amount == "") {
      this.setState({ amount: '1' })
    }

    var data = this.state.rates[this.state.secondValue] / this.state.rates[this.state.firstValue] * this.state.amount

    this.setState({ result: data })
    if (this.state.secondValue == "") {
      alert("Please Select The Destination Currency");
    }
    if (this.state.firstValue == "") {
      alert("Please Select The Base Currency")
    }
    this.setState({ resultDisplay: <Text>{this.state.amount} {this.state.firstValue} = {this.state.result} {this.state.secondValue}</Text> })
  }


  componentDidMount() {
    return fetch('http://data.fixer.io/api/latest?access_key=d2c4ec203381418897e249b03f00dc8e')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          success: responseJson.success,
          base: responseJson.base,
          date: responseJson.date,
          rates: responseJson.rates,
        })

      })
      .catch((error) => {
        console.error(error);

      });
  };

  render() {
    return (
      <ScrollView>


        <ImageBackground style={styles.container} source={require("../realClockApp/assets/images.jpg")}>
          <Image style={styles.imageContainer} source={require("../realClockApp/assets/exchange.png")} />

          <View style={styles.title}>
            <Text style={{ fontSize: 30, height: 50, justifyContent: 'center' }}>Currency Exchange</Text>
          </View>

          <View style={{ height: 50, backgroundColor: 'powdergreen' }}>
            <Text style={{ fontSize: 20 }}>Date: {this.state.date}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ marginRight: 10, fontSize: 20, color: 'white' }}>Exchange Quantity</Text>
            <TextInput style={{ fontSize: 20, color:'white', backgroundColor: 'rgba(255,255,255,0.3)' }} placeholder='Input amount' keyboardType='numeric' value={this.state.amount}
              onChangeText={(value) => this.setState({ amount: value })}
            />

          </View>
          <View style={styles.coverSelectContainer}>
            <View style={styles.selectContainer}>
              <Text style={{ fontSize: 20, justifyContent: 'center' }}>From: </Text>
              <Picker
                style={{ width: '80%' }}
                selectedValue={this.state.firstValue}
                onValueChange={(itemValue, itemIndex) => this.setState({ firstValue: itemValue })}>

                <Picker.Item label="Base Currency" value="" />

                <Picker.Item label="AED - United Arab Emirates Dirham" value="AED" />
                <Picker.Item label="AFN - Afghan Afghani" value="AFN" />
                <Picker.Item label="ALL - Albanian Lek" value="ALL" />
                <Picker.Item label="AMD - Armenian Dram" value="AMD" />
                <Picker.Item label="ANG - Netherlands Antillean Guilder" value="ANG" />
                <Picker.Item label="AOA - Angolan Kwanza" value="AOA" />
                <Picker.Item label="ARS - Argentine Peso" value="ARS" />
                <Picker.Item label="AUD - Australuan Dollar" value="AUD" />
                <Picker.Item label="AWG - Aruban Florin" value="AWG" />
                <Picker.Item label="AZN - Azerbaijani Manat" value="AZN" />
                <Picker.Item label="BAM - Bosnia-Herzegovina Convertible Mark" value="BAM" />
                <Picker.Item label="BBD - Barbadian Dollar" value="BBD" />
                <Picker.Item label="BDT - Bangladeshi Taka" value="BDT" />
                <Picker.Item label="BGN - Bulgarian Lev" value="BGN" />
                <Picker.Item label="BHD - Bahraini Dinar" value="BHD" />
                <Picker.Item label="BIF - Burundian Franc" value="BIF" />
                <Picker.Item label="BMD - Bermudan Dollar" value="BMD" />
                <Picker.Item label="BND - Brunei Dollar" value="BND" />
                <Picker.Item label="BOB - Bolivian Boliviano" value="BOB" />
                <Picker.Item label="BRL - Brazilian Real" value="BRL" />
                <Picker.Item label="BSD - Bahamian Dollar" value="BSD" />
                <Picker.Item label="BTC - Bitcoin" value="BTC" />
                <Picker.Item label="BTN - Bhutan Ngultrum" value="BTN" />
                <Picker.Item label="BWP - Botswanan Pula" value="BWP" />
                <Picker.Item label="BYN - Belarusian Ruble" value="BYN" />
                <Picker.Item label="BYR - Belarusian Ruble" value="BYR" />
                <Picker.Item label="BZD - Belize Dollar" value="BZD" />
                <Picker.Item label="CAD - Canadian Dollar" value="CAD" />
                <Picker.Item label="CDF - Congolese Franc" value="CDF" />
                <Picker.Item label="CHF - Swiss Franc" value="CHF" />
                <Picker.Item label="CLF - Chilean Unit of Account(UF) " value="CLF" />
                <Picker.Item label="CLP - Chilean Peso" value="CLP" />
                <Picker.Item label="CNY - Chinese Yuan" value="CNY" />
                <Picker.Item label="COP - Colombian Peso" value="COP" />
                <Picker.Item label="CRC - Costa Rican Colón" value="CRC" />
                <Picker.Item label="CUC - Cuban Convertible Peso" value="CUC" />
                <Picker.Item label="CUP - Cuban Peso" value="CUP" />
                <Picker.Item label="CVE - Cape Verdean Escudo" value="CVE" />
                <Picker.Item label="CZK - Czech Koruna" value="CZK" />
                <Picker.Item label="DJF - Djiboutian Franc" value="DJF" />
                <Picker.Item label="DKK - Danish Krone" value="DKK" />
                <Picker.Item label="DOP - Dominican Peso" value="DOP" />
                <Picker.Item label="DZD - Algerian Dinar" value="DZD" />
                <Picker.Item label="EGP - Egyptian Pound" value="EGP" />
                <Picker.Item label="ERN - Eritrea Nakfa" value="ERN" />
                <Picker.Item label="ETB - Ethiopian Birr" value="ETB" />
                <Picker.Item label="EUR - Euro" value="EUR" />
                <Picker.Item label="FJD - Fijian Dollar" value="FJD" />
                <Picker.Item label="FKP - Falkland Island Pound" value="FKP" />
                <Picker.Item label="GBP - British Pound sterling" value="GBP" />
                <Picker.Item label="GEL - Georgian Lari" value="GEL" />
                <Picker.Item label="GGP - Guernsey Pound" value="GGP" />
                <Picker.Item label="GHS - Ghanaian Cedi" value="GHS" />
                <Picker.Item label="GIP - Gibraltar Pound" value="GIP" />
                <Picker.Item label="GMD - Gambian dalasi" value="GMD" />
                <Picker.Item label="GNF - Guinean Franc" value="GNF" />
                <Picker.Item label="GTQ - Guatemalan Quetzal" value="GTQ" />
                <Picker.Item label="GYD - Guyanaese Dollar" value="GYD" />
                <Picker.Item label="HKD - Hong Kong Dollar" value="HKD" />
                <Picker.Item label="HNL - Honduran Lempira" value="HNL" />
                <Picker.Item label="HRK - Croatian Kuna" value="HRK" />
                <Picker.Item label="HTG - Haitian Gourde" value="HTG" />
                <Picker.Item label="HUF - Hungarian Forint" value="HUF" />
                <Picker.Item label="IDR - Indonesian Rupiah" value="IDR" />
                <Picker.Item label="ILS - Israeli New Shekel" value="ILS" />
                <Picker.Item label="IMP - Isle of Man Pound" value="IMP" />
                <Picker.Item label="INR - Indian Rupee" value="INR" />
                <Picker.Item label="IQD - Iraqi Dinar" value="IQD" />
                <Picker.Item label="IRR - Iranian Rial" value="IRR" />
                <Picker.Item label="ISK - Icelandic Króna" value="ISK" />
                <Picker.Item label="JEP - Jersey Pound" value="JEP" />
                <Picker.Item label="JMD - Jamaican Dollar" value="JMD" />
                <Picker.Item label="JOD - Jordanian Dinar" value="JOD" />
                <Picker.Item label="JPY - Japanese Yen" value="JPY" />
                <Picker.Item label="KES - Kenyan Shilling" value="KES" />
                <Picker.Item label="KGS - Kyrgystani Som" value="KGS" />
                <Picker.Item label="KHR - Cambodian riel" value="KHR" />
                <Picker.Item label="KMF - Comorian franc" value="KMF" />
                <Picker.Item label="KPW - North Korean Won" value="KPW" />
                <Picker.Item label="KRW - South Korean won" value="KRW" />
                <Picker.Item label="KWD - Kuwaiti Dinar" value="KWD" />
                <Picker.Item label="KYD - Cayman Islands Dollar" value="KYD" />
                <Picker.Item label="KZT - Kazakhstani Tenge" value="KZT" />
                <Picker.Item label="LAK - Laotian Kip" value="LAK" />
                <Picker.Item label="LBP - Lebanese pound" value="LBP" />
                <Picker.Item label="LKR - Sri Lankan Rupee" value="LKR" />
                <Picker.Item label="LRD - Liberian Dollar" value="LRD" />
                <Picker.Item label="LSL - Lesotho loti" value="LSL" />
                <Picker.Item label="LTL - Lithuania Litas" value="LTL" />
                <Picker.Item label="LVL - Latvia Lat" value="LVL" />
                <Picker.Item label="LYD - Libyan Dinar" value="LYD" />
                <Picker.Item label="MAD - Moroccan Dirham" value="MAD" />
                <Picker.Item label="MDL - Moldovan Leu" value="MDL" />
                <Picker.Item label="MGA - Malagasy Ariary" value="MGA" />
                <Picker.Item label="MKD - Macedonian Denar" value="MKD" />
                <Picker.Item label="MMK - Myanmar Kyat" value="MMK" />
                <Picker.Item label="MNT - Mongolia Tughrik" value="MNT" />
                <Picker.Item label="MOP - Macanese Pataca" value="MOP" />
                <Picker.Item label="MRO - Mauritanian Ouguiya (1973–2017)" value="MRO" />
                <Picker.Item label="MUR - Mauritian Rupee" value="MUR" />
                <Picker.Item label="MVR - Maldivian Rufiyaa" value="MVR" />
                <Picker.Item label="MWK - Malawian Kwacha" value="MWK" />
                <Picker.Item label="MXN - Mexican Peso" value="MXN" />
                <Picker.Item label="MYR - Malaysian Ringgit" value="MYR" />
                <Picker.Item label="MZN - Mozambican Metical" value="MZN" />
                <Picker.Item label="NAD - Namibian Dollar" value="NAD" />
                <Picker.Item label="NGN - Nigerian Naira" value="NGN" />
                <Picker.Item label="NIO - Nicaraguan Córdoba" value="NIO" />
                <Picker.Item label="NOK - Norwegian Krone" value="NOK" />
                <Picker.Item label="NPR - Nepalese Rupee" value="NPR" />
                <Picker.Item label="NZD - New Zealand Dollar" value="NZD" />
                <Picker.Item label="OMR - Omani Rial" value="OMR" />
                <Picker.Item label="PAB - Panamanian Balboa" value="PAB" />
                <Picker.Item label="PEN - Peru Sol" value="PEN" />
                <Picker.Item label="PGK - Papua New Guinean Kina" value="PGK" />
                <Picker.Item label="PKR - Pakistani Rupee" value="PKR" />
                <Picker.Item label="PLN - Poland Zloty" value="PLN" />
                <Picker.Item label="PYG - Paraguayan Guarani" value="PYG" />
                <Picker.Item label="QAR - Qatari Rial" value="QAR" />
                <Picker.Item label="RON - Romanian Leu" value="RON" />
                <Picker.Item label="RSD - Serbian Dinar" value="RSD" />
                <Picker.Item label="RUB - Russian Ruble" value="RUB" />
                <Picker.Item label="RWF - Rwandan franc" value="RWF" />
                <Picker.Item label="SAR - Saudi Riyal" value="SAR" />
                <Picker.Item label="SBD - Solomon Islands Dollar" value="SBD" />
                <Picker.Item label="SCR - Seychellois Rupee" value="SCR" />
                <Picker.Item label="SDG - Sudanese Pound" value="SDG" />
                <Picker.Item label="SEK - Swedish Krona" value="SEK" />
                <Picker.Item label="SGD - Singapore Dollar" value="SGD" />
                <Picker.Item label="SHP - Saint Helena Pound" value="SHP" />
                <Picker.Item label="SLL - Sierra Leonean Leone" value="SLL" />
                <Picker.Item label="SOS - Somali Shilling" value="SOS" />
                <Picker.Item label="SRD - Surinamese Dollar" value="SRD" />
                <Picker.Item label="STD - São Tomé and Príncipe Dobra" value="STD" />
                <Picker.Item label="SVC - Salvadoran Colón" value="SVC" />
                <Picker.Item label="SYP - Syrian Pounds" value="SYP" />
                <Picker.Item label="SZL - Swazi Lilangeni" value="SZL" />
                <Picker.Item label="THB - Thai Baht" value="THB" />
                <Picker.Item label="TJS - Tajikistani Somoni" value="TJS" />
                <Picker.Item label="TMT - Turkmenistan manat" value="TMT" />
                <Picker.Item label="TND - Tunisian Dinar" value="TND" />
                <Picker.Item label="TOP - Tongan Pa?anga" value="TOP" />
                <Picker.Item label="TRY - Turkish lira" value="TRY" />
                <Picker.Item label="TTD - Trinidad and Tobago Dollar" value="TTD" />
                <Picker.Item label="TWD - Taiwan New Dollar" value="TWD" />
                <Picker.Item label="TZS - Tanzanian Shilling" value="TZS" />
                <Picker.Item label="UAH - Ukrainian hryvnia" value="UAH" />
                <Picker.Item label="UGX - Ugandan Shilling" value="UGX" />
                <Picker.Item label="USD - United States Dollar" value="USD" />
                <Picker.Item label="UYU - Uruguayan Peso" value="UYU" />
                <Picker.Item label="UZS - Uzbekistani Som" value="UZS" />
                <Picker.Item label="VEF - Venezuelan Bolívar Fuerte" value="VEF" />
                <Picker.Item label="VND - Vietnamese Dong" value="VND" />
                <Picker.Item label="VUV - Vanuatu Vatu" value="VUV" />
                <Picker.Item label="WST - Samoan Tala" value="WST" />
                <Picker.Item label="XAF - Central African CFA franc" value="XAF" />
                <Picker.Item label="XAG - Silver" value="XAG" />
                <Picker.Item label="XAU - Ounces of Gold" value="XAU" />
                <Picker.Item label="XCD - East Caribbean Dollar" value="XCD" />
                <Picker.Item label="XDR - Special Drawing Rights" value="XDR" />
                <Picker.Item label="XOF - West African CFA franc" value="XOF" />
                <Picker.Item label="XPF - CFP Franc" value="XPF" />
                <Picker.Item label="YER - Yemeni Rial" value="YER" />
                <Picker.Item label="ZAR - South African Rand" value="ZAR" />
                <Picker.Item label="ZMK - Zambian Kwacha(Obsolete)" value="ZMK" />
                <Picker.Item label="ZMW - Zambian Kwacha" value="ZMW" />
                <Picker.Item label="ZWL - Zimbabwe Dollar" value="ZML" />

              </Picker>
            </View>
            <View style={styles.selectContainer}>
              <Text style={{ fontSize: 20, justifyContent: 'center' }}>To: </Text>
              <Picker
                style={{ width: '80%' }}
                selectedValue={this.state.secondValue}
                onValueChange={(itemValue, itemIndex) => this.setState({ secondValue: itemValue })}>

                <Picker.Item label='Destination Currency' value="" />

                <Picker.Item label="AED - United Arab Emirates Dirham" value="AED" />
                <Picker.Item label="AFN - Afghan Afghani" value="AFN" />
                <Picker.Item label="ALL - Albanian Lek" value="ALL" />
                <Picker.Item label="AMD - Armenian Dram" value="AMD" />
                <Picker.Item label="ANG - Netherlands Antillean Guilder" value="ANG" />
                <Picker.Item label="AOA - Angolan Kwanza" value="AOA" />
                <Picker.Item label="ARS - Argentine Peso" value="ARS" />
                <Picker.Item label="AUD - Australuan Dollar" value="AUD" />
                <Picker.Item label="AWG - Aruban Florin" value="AWG" />
                <Picker.Item label="AZN - Azerbaijani Manat" value="AZN" />
                <Picker.Item label="BAM - Bosnia-Herzegovina Convertible Mark" value="BAM" />
                <Picker.Item label="BBD - Barbadian Dollar" value="BBD" />
                <Picker.Item label="BDT - Bangladeshi Taka" value="BDT" />
                <Picker.Item label="BGN - Bulgarian Lev" value="BGN" />
                <Picker.Item label="BHD - Bahraini Dinar" value="BHD" />
                <Picker.Item label="BIF - Burundian Franc" value="BIF" />
                <Picker.Item label="BMD - Bermudan Dollar" value="BMD" />
                <Picker.Item label="BND - Brunei Dollar" value="BND" />
                <Picker.Item label="BOB - Bolivian Boliviano" value="BOB" />
                <Picker.Item label="BRL - Brazilian Real" value="BRL" />
                <Picker.Item label="BSD - Bahamian Dollar" value="BSD" />
                <Picker.Item label="BTC - Bitcoin" value="BTC" />
                <Picker.Item label="BTN - Bhutan Ngultrum" value="BTN" />
                <Picker.Item label="BWP - Botswanan Pula" value="BWP" />
                <Picker.Item label="BYN - Belarusian Ruble" value="BYN" />
                <Picker.Item label="BYR - Belarusian Ruble" value="BYR" />
                <Picker.Item label="BZD - Belize Dollar" value="BZD" />
                <Picker.Item label="CAD - Canadian Dollar" value="CAD" />
                <Picker.Item label="CDF - Congolese Franc" value="CDF" />
                <Picker.Item label="CHF - Swiss Franc" value="CHF" />
                <Picker.Item label="CLF - Chilean Unit of Account(UF) " value="CLF" />
                <Picker.Item label="CLP - Chilean Peso" value="CLP" />
                <Picker.Item label="CNY - Chinese Yuan" value="CNY" />
                <Picker.Item label="COP - Colombian Peso" value="COP" />
                <Picker.Item label="CRC - Costa Rican Colón" value="CRC" />
                <Picker.Item label="CUC - Cuban Convertible Peso" value="CUC" />
                <Picker.Item label="CUP - Cuban Peso" value="CUP" />
                <Picker.Item label="CVE - Cape Verdean Escudo" value="CVE" />
                <Picker.Item label="CZK - Czech Koruna" value="CZK" />
                <Picker.Item label="DJF - Djiboutian Franc" value="DJF" />
                <Picker.Item label="DKK - Danish Krone" value="DKK" />
                <Picker.Item label="DOP - Dominican Peso" value="DOP" />
                <Picker.Item label="DZD - Algerian Dinar" value="DZD" />
                <Picker.Item label="EGP - Egyptian Pound" value="EGP" />
                <Picker.Item label="ERN - Eritrea Nakfa" value="ERN" />
                <Picker.Item label="ETB - Ethiopian Birr" value="ETB" />
                <Picker.Item label="EUR - Euro" value="EUR" />
                <Picker.Item label="FJD - Fijian Dollar" value="FJD" />
                <Picker.Item label="FKP - Falkland Island Pound" value="FKP" />
                <Picker.Item label="GBP - British Pound sterling" value="GBP" />
                <Picker.Item label="GEL - Georgian Lari" value="GEL" />
                <Picker.Item label="GGP - Guernsey Pound" value="GGP" />
                <Picker.Item label="GHS - Ghanaian Cedi" value="GHS" />
                <Picker.Item label="GIP - Gibraltar Pound" value="GIP" />
                <Picker.Item label="GMD - Gambian dalasi" value="GMD" />
                <Picker.Item label="GNF - Guinean Franc" value="GNF" />
                <Picker.Item label="GTQ - Guatemalan Quetzal" value="GTQ" />
                <Picker.Item label="GYD - Guyanaese Dollar" value="GYD" />
                <Picker.Item label="HKD - Hong Kong Dollar" value="HKD" />
                <Picker.Item label="HNL - Honduran Lempira" value="HNL" />
                <Picker.Item label="HRK - Croatian Kuna" value="HRK" />
                <Picker.Item label="HTG - Haitian Gourde" value="HTG" />
                <Picker.Item label="HUF - Hungarian Forint" value="HUF" />
                <Picker.Item label="IDR - Indonesian Rupiah" value="IDR" />
                <Picker.Item label="ILS - Israeli New Shekel" value="ILS" />
                <Picker.Item label="IMP - Isle of Man Pound" value="IMP" />
                <Picker.Item label="INR - Indian Rupee" value="INR" />
                <Picker.Item label="IQD - Iraqi Dinar" value="IQD" />
                <Picker.Item label="IRR - Iranian Rial" value="IRR" />
                <Picker.Item label="ISK - Icelandic Króna" value="ISK" />
                <Picker.Item label="JEP - Jersey Pound" value="JEP" />
                <Picker.Item label="JMD - Jamaican Dollar" value="JMD" />
                <Picker.Item label="JOD - Jordanian Dinar" value="JOD" />
                <Picker.Item label="JPY - Japanese Yen" value="JPY" />
                <Picker.Item label="KES - Kenyan Shilling" value="KES" />
                <Picker.Item label="KGS - Kyrgystani Som" value="KGS" />
                <Picker.Item label="KHR - Cambodian riel" value="KHR" />
                <Picker.Item label="KMF - Comorian franc" value="KMF" />
                <Picker.Item label="KPW - North Korean Won" value="KPW" />
                <Picker.Item label="KRW - South Korean won" value="KRW" />
                <Picker.Item label="KWD - Kuwaiti Dinar" value="KWD" />
                <Picker.Item label="KYD - Cayman Islands Dollar" value="KYD" />
                <Picker.Item label="KZT - Kazakhstani Tenge" value="KZT" />
                <Picker.Item label="LAK - Laotian Kip" value="LAK" />
                <Picker.Item label="LBP - Lebanese pound" value="LBP" />
                <Picker.Item label="LKR - Sri Lankan Rupee" value="LKR" />
                <Picker.Item label="LRD - Liberian Dollar" value="LRD" />
                <Picker.Item label="LSL - Lesotho loti" value="LSL" />
                <Picker.Item label="LTL - Lithuania Litas" value="LTL" />
                <Picker.Item label="LVL - Latvia Lat" value="LVL" />
                <Picker.Item label="LYD - Libyan Dinar" value="LYD" />
                <Picker.Item label="MAD - Moroccan Dirham" value="MAD" />
                <Picker.Item label="MDL - Moldovan Leu" value="MDL" />
                <Picker.Item label="MGA - Malagasy Ariary" value="MGA" />
                <Picker.Item label="MKD - Macedonian Denar" value="MKD" />
                <Picker.Item label="MMK - Myanmar Kyat" value="MMK" />
                <Picker.Item label="MNT - Mongolia Tughrik" value="MNT" />
                <Picker.Item label="MOP - Macanese Pataca" value="MOP" />
                <Picker.Item label="MRO - Mauritanian Ouguiya (1973–2017)" value="MRO" />
                <Picker.Item label="MUR - Mauritian Rupee" value="MUR" />
                <Picker.Item label="MVR - Maldivian Rufiyaa" value="MVR" />
                <Picker.Item label="MWK - Malawian Kwacha" value="MWK" />
                <Picker.Item label="MXN - Mexican Peso" value="MXN" />
                <Picker.Item label="MYR - Malaysian Ringgit" value="MYR" />
                <Picker.Item label="MZN - Mozambican Metical" value="MZN" />
                <Picker.Item label="NAD - Namibian Dollar" value="NAD" />
                <Picker.Item label="NGN - Nigerian Naira" value="NGN" />
                <Picker.Item label="NIO - Nicaraguan Córdoba" value="NIO" />
                <Picker.Item label="NOK - Norwegian Krone" value="NOK" />
                <Picker.Item label="NPR - Nepalese Rupee" value="NPR" />
                <Picker.Item label="NZD - New Zealand Dollar" value="NZD" />
                <Picker.Item label="OMR - Omani Rial" value="OMR" />
                <Picker.Item label="PAB - Panamanian Balboa" value="PAB" />
                <Picker.Item label="PEN - Peru Sol" value="PEN" />
                <Picker.Item label="PGK - Papua New Guinean Kina" value="PGK" />
                <Picker.Item label="PKR - Pakistani Rupee" value="PKR" />
                <Picker.Item label="PLN - Poland Zloty" value="PLN" />
                <Picker.Item label="PYG - Paraguayan Guarani" value="PYG" />
                <Picker.Item label="QAR - Qatari Rial" value="QAR" />
                <Picker.Item label="RON - Romanian Leu" value="RON" />
                <Picker.Item label="RSD - Serbian Dinar" value="RSD" />
                <Picker.Item label="RUB - Russian Ruble" value="RUB" />
                <Picker.Item label="RWF - Rwandan franc" value="RWF" />
                <Picker.Item label="SAR - Saudi Riyal" value="SAR" />
                <Picker.Item label="SBD - Solomon Islands Dollar" value="SBD" />
                <Picker.Item label="SCR - Seychellois Rupee" value="SCR" />
                <Picker.Item label="SDG - Sudanese Pound" value="SDG" />
                <Picker.Item label="SEK - Swedish Krona" value="SEK" />
                <Picker.Item label="SGD - Singapore Dollar" value="SGD" />
                <Picker.Item label="SHP - Saint Helena Pound" value="SHP" />
                <Picker.Item label="SLL - Sierra Leonean Leone" value="SLL" />
                <Picker.Item label="SOS - Somali Shilling" value="SOS" />
                <Picker.Item label="SRD - Surinamese Dollar" value="SRD" />
                <Picker.Item label="STD - São Tomé and Príncipe Dobra" value="STD" />
                <Picker.Item label="SVC - Salvadoran Colón" value="SVC" />
                <Picker.Item label="SYP - Syrian Pounds" value="SYP" />
                <Picker.Item label="SZL - Swazi Lilangeni" value="SZL" />
                <Picker.Item label="THB - Thai Baht" value="THB" />
                <Picker.Item label="TJS - Tajikistani Somoni" value="TJS" />
                <Picker.Item label="TMT - Turkmenistan manat" value="TMT" />
                <Picker.Item label="TND - Tunisian Dinar" value="TND" />
                <Picker.Item label="TOP - Tongan Pa?anga" value="TOP" />
                <Picker.Item label="TRY - Turkish lira" value="TRY" />
                <Picker.Item label="TTD - Trinidad and Tobago Dollar" value="TTD" />
                <Picker.Item label="TWD - Taiwan New Dollar" value="TWD" />
                <Picker.Item label="TZS - Tanzanian Shilling" value="TZS" />
                <Picker.Item label="UAH - Ukrainian hryvnia" value="UAH" />
                <Picker.Item label="UGX - Ugandan Shilling" value="UGX" />
                <Picker.Item label="USD - United States Dollar" value="USD" />
                <Picker.Item label="UYU - Uruguayan Peso" value="UYU" />
                <Picker.Item label="UZS - Uzbekistani Som" value="UZS" />
                <Picker.Item label="VEF - Venezuelan Bolívar Fuerte" value="VEF" />
                <Picker.Item label="VND - Vietnamese Dong" value="VND" />
                <Picker.Item label="VUV - Vanuatu Vatu" value="VUV" />
                <Picker.Item label="WST - Samoan Tala" value="WST" />
                <Picker.Item label="XAF - Central African CFA franc" value="XAF" />
                <Picker.Item label="XAG - Silver" value="XAG" />
                <Picker.Item label="XAU - Ounces of Gold" value="XAU" />
                <Picker.Item label="XCD - East Caribbean Dollar" value="XCD" />
                <Picker.Item label="XDR - Special Drawing Rights" value="XDR" />
                <Picker.Item label="XOF - West African CFA franc" value="XOF" />
                <Picker.Item label="XPF - CFP Franc" value="XPF" />
                <Picker.Item label="YER - Yemeni Rial" value="YER" />
                <Picker.Item label="ZAR - South African Rand" value="ZAR" />
                <Picker.Item label="ZMK - Zambian Kwacha(Obsolete)" value="ZMK" />
                <Picker.Item label="ZMW - Zambian Kwacha" value="ZMW" />
                <Picker.Item label="ZWL - Zimbabwe Dollar" value="ZML" />
              </Picker>
            </View>
            <Button style={{ marginTop: 40 }} title="Exchange" onPress={this.calculate} />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>RESULT</Text>
          <Text style={{ width: '80%', marginTop: 20, fontSize: 20 }}>{this.state.resultDisplay}</Text>
        </View>



      </ScrollView>
    )


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "column",
    opacity: 0.8
  },

  title: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  imageContainer: {
    justifyContent: 'center',
    marginTop: 50,
    height: 120,
    width: 120
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  coverSelectContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

});

