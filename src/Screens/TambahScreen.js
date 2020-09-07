import React, {Component} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {insert} from '../Components/Database'
import {Card, Input} from 'react-native-elements'

class TambahScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      judul: '',
      isi: '',
    }
  }

  _add() {
    var date = new Date().toISOString()
    var {isi, judul} = this.state
    var data = {
      judul: judul,
      isi: isi,
      tanggal: date,
    }
    insert(data)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Title>Catatan</Card.Title>
          <Card.Divider />
          <Input placeholder="Judul ..." onChangeText={(judul) => this.setState({judul})} />
          <Input placeholder="Catatan Mu ..." onChangeText={(isi) => this.setState({isi})} />
          <Button
            title="Simpan"
            onPress={() => {
              this._add()
            }}
          />
        </Card>
      </View>
    )
  }
}

export default TambahScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
