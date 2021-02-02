import React, { useState } from 'react'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { THEME } from './Theme'
import Cite from './components/Cite'
import Form from './components/Form'

const App = () => {
  //Definir state
  const [dates, setDates] = useState([])

  const [formActive, setFormActive] = useState(false)

  //Funcion para eliminar pacientes
  const deleteDate = dateId => {
    setDates(dates.filter(date => date.id !== dateId))
  }

  const newCite = data => {
    setDates([...dates, data])
  }

  console.log(formActive)

  return (
    <>
      <StatusBar backgroundColor={THEME.background} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Citas</Text>
          <TouchableHighlight
            style={styles.newCite}
            onPress={() => setFormActive(!formActive)}>
            {formActive ? (
              <Svg
                viewBox="0 0 24 24"
                width={24}
                height={24}
                stroke="#eee"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <Path d="M19 12H5M12 19l-7-7 7-7" />
              </Svg>
            ) : (
              <Svg
                viewBox="0 0 24 24"
                width={24}
                height={24}
                stroke="#eee"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <Path d="M12 5v14M5 12h14" />
              </Svg>
            )}
          </TouchableHighlight>
        </View>
        {formActive ? (
          <Text style={styles.preList}>Crear cita</Text>
        ) : (
          <Text style={styles.preList}>Tus citas</Text>
        )}
        <View style={styles.content}>
          {formActive ? (
            <ScrollView>
              <Form setFormActive={setFormActive} newCite={newCite} />
            </ScrollView>
          ) : (
            <>
              {dates.length > 0 ? (
                <FlatList
                  style={styles.list}
                  data={dates}
                  renderItem={({ item }) => (
                    <Cite deleteDate={deleteDate} item={item} />
                  )}
                  keyExtractor={date => date.id}
                />
              ) : (
                <View style={styles.noContent}>
                  <Image source={require('./no-content.gif')} />
                  <Text style={styles.noContentText}>
                    Parece que no hay citas...
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  )
}

const circularButton = 28

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.background,
    flex: 1,
  },

  content: {
    flex: 1,
    margin: 16,
  },

  list: {
    flex: 1,
  },

  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },

  headingText: {
    color: THEME.text,
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
  },

  preList: {
    color: THEME.text,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
  },

  newCite: {
    backgroundColor: THEME.success,
    width: circularButton,
    height: circularButton,
    borderRadius: circularButton / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  noContentText: {
    color: THEME.text,
    fontSize: 18,
    marginVertical: 16,
  },
})

export default App
