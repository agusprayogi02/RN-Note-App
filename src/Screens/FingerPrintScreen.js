import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, Image, Text, StyleSheet, View, ViewPropTypes, Platform, Button} from 'react-native'

import FingerprintScanner from 'react-native-fingerprint-scanner'

class FingerPrintScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
    }

    this.description = null
  }
  componentDidMount() {
    if (this.requiresLegacyAuthentication()) {
      this.authLegacy()
    } else {
      this.authCurrent()
    }
  }

  componentWillUnmount = () => {
    FingerprintScanner.release()
  }

  requiresLegacyAuthentication() {
    return Platform.Version < 23
  }

  authCurrent() {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then((rest) => {
        this.setState({biometricLegacy: rest})
        if (rest == true) {
          return this.props.navigation.navigate('Home')
        }
      })
      .catch((err) => {
        this.setState({errorMessageLegacy: err})
      })
  }

  authLegacy() {
    FingerprintScanner.authenticate({onAttempt: this.handleAuthenticationAttemptedLegacy})
      .then(() => {
        this.props.handlePopupDismissedLegacy()
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully')
      })
      .catch((error) => {
        this.setState({errorMessageLegacy: error.message, biometricLegacy: error.biometric})
        this.description.shake()
      })
  }

  handleAuthenticationAttemptedLegacy = (error) => {
    this.setState({errorMessageLegacy: error.message})
    this.description.shake()
  }

  render = () => {
    const {errorMessageLegacy, biometricLegacy} = this.state
    var {navigation} = this.props

    if (this.requiresLegacyAuthentication()) {
      return (
        <View style={styles.container}>
          {errorMessageLegacy && <Text>{errorMessageLegacy}</Text>}
          {biometricLegacy && <Text>{biometricLegacy}</Text>}
          <View style={styles.container}>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    )
  }
}

FingerPrintScreen.propTypes = {
  // onAuthenticate: PropTypes.func.isRequired,
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
}

export default FingerPrintScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
