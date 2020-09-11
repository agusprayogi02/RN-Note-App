import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, RefreshControl, Text, Dimensions, View} from 'react-native'
import Styles from '../Components/GlobalStyles'
import {Icon, Card, ListItem, Input, Button} from 'react-native-elements'
import {createTable, db, hapus, insert, ubah} from '../Components/Database.js'
import {ScrollView} from 'react-native-gesture-handler'
import Dialog, {DialogContent} from 'react-native-popup-dialog'

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

var {width, height} = Dimensions.get('screen')

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      refresh: false,
      visible: false,
      judul: '',
      isi: '',
      btn: 'simpan',
      id: false,
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.setState({refresh: true})
    this.upp()
    wait(1000).then(() => this.setState({refresh: false}))
  }

  upp() {
    createTable()
    db().transaction((tx) => {
      tx.executeSql('SELECT * FROM notes', [], (sql, rest) => {
        if (rest != null) {
          var data = []
          for (let i = 0; i < rest.rows.length; i++) {
            const item = rest.rows.item(i)
            console.log(item)
            data.push(item)
          }
          this.setState({data})
        }
      })
    })
  }

  _add() {
    var date = new Date().toISOString()
    var {isi, judul, id} = this.state
    var data = {
      judul: judul,
      isi: isi,
      tanggal: date,
    }
    if (id) {
      ubah(data, id)
      this.setState({id: false})
    } else {
      insert(data)
    }
    this.setState({visible: false})
    this.upp()
  }

  _delete(id) {
    hapus(id)
    this.onRefresh()
  }

  _update(item) {
    var {isi, judul, id} = item
    console.log('isi : ' + item)
    this.setState({isi: isi, judul: judul, visible: true, btn: 'Ubah', id: id})
  }

  _plus() {
    this.setState({visible: true, btn: 'Simpan'})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[Styles.header, styles.head]}>Catatanku</Text>
        <ScrollView
          style={{margin: 5}}
          centerContent={true}
          refreshControl={
            <RefreshControl refreshing={this.state.refresh} onRefresh={() => this.onRefresh()} />
          }>
          {this.state.data &&
            this.state.data.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={{fontWeight: 'bold'}}>{l.judul}</ListItem.Title>
                  <ListItem.Subtitle>{l.isi}</ListItem.Subtitle>
                  <ListItem.Subtitle>{l.tanggal}</ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: 'orange'}]}
                  onPress={() => this._update(l)}>
                  <Icon name="edit" style="font-awesome" color="white" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this._delete(l.id)}>
                  <Icon name="delete" style="font-awesome" color="white" size={24} />
                </TouchableOpacity>
              </ListItem>
            ))}
        </ScrollView>
        <TouchableOpacity style={Styles.floatButtom} onPress={() => this._plus()}>
          <Icon name="plus" type="font-awesome" color="red" />
        </TouchableOpacity>
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false})
          }}>
          <DialogContent style={{padding: 0, width: width - 50}}>
            <Card>
              <Card.Title>Notes</Card.Title>
              <Card.Divider />
              <Input
                placeholder="Judul ..."
                onChangeText={(judul) => this.setState({judul})}
                value={this.state.judul}
              />
              <Input
                placeholder="Catatan Mu ..."
                onChangeText={(isi) => this.setState({isi})}
                value={this.state.isi}
              />
              <Button
                title={this.state.btn}
                onPress={() => {
                  this._add()
                }}
              />
            </Card>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  btn: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
    marginRight: -5,
  },
  head: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'gray',
  },
})
