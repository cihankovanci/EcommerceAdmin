import {Dimensions} from 'react-native';

export enum Colors {
  primary = '#11BF2B',
  

  neutral50 = '#F6F6F6',
  neutral100 = '#E7E7E7',
  neutral200 = '#D1D1D1',
  neutral300 = '#B0B0B0',
  neutral400 = '#888888',
  neutral500 = '#6D6D6D',
  neutral600 = '#5D5D5D',
  neutral700 = '#4F4F4F',
  neutral800 = '#454545',
  neutral900 = '#3D3D3D',
  neutral950 = '#212121',


  success50 = '#EFFEF1',
  success100 = '#DAFEDF',
  success300 = '#11BF2B',

  warning50 = '#FFF8EC',
  warning100 = '#FFD596',
  warning300 = '#F19306',

  danger50 = '#FEF3F2',
  danger100 = '#FDE5E3',
  danger300 = '#EA4335',

  background = '#F6F6F6',
  darkModeTextColor = '#FFFFFF66',
  textColor50 = '#F6F6F6',
  textColor100 = '#5F5F5F',
  textColor200 = '#000000',

  primaryDisabled = '#DCDCDC',
  placeholderText = '#0000008A',
  transparent = 'transparent',

  borderColor = '#CDCFDB',

  TextColor = '#0000008A',
  TextDisabledColor = '#929292',

  white = '#FFFFFF',
  black = '#000000',
  red = '#FF0000',
  green = '#00FF00',
}

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export enum Radius {
  xs = 4,
  sm = 8,
  md = 16,
  lg = 24,
  xl = 32,
}

export enum Spacing {
  xs = 4,
  sm = 8,
  md = 16,
  lg = 24,
  xl = 32,
}

export enum FontSize {
  xs = 12,
  sm = 14,
  md = 16,
  lg = 18,
  xl = 26,
  xxl = 32,
}

export enum FontWeight {
  xs = '200',
  sm = '400',
  md = '500',
  lg = '600',
  xl = '500',
  xxl = '500',
}

export enum FontFamily {
  Nacelle = 'Nacelle-Regular',
  SpaceGrotesk = 'SpaceGrotesk-Medium',
}
