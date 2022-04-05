import React from 'react';
import { Text, Platform, StyleSheet, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


export const typography = () => {
	const oldTextRender = Text.render;
	Text.render = function(...args) {
		const origin = oldTextRender.call(this, ...args);
		return React.cloneElement(origin, {
			style: [styles.defaultText, origin.props.style],
		});
	}
}
const styles = StyleSheet.create({
	defaultText: {
		fontSize: EStyleSheet.value("14rem"),
		color: "black"
	}
});