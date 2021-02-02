import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { THEME } from '../Theme'

const Cite = ({ item, deleteDate }) => {
  const { id, sign, patient, owner } = item

  const deleteAppointment = dateId => {
    deleteDate(dateId)
  }

  return (
    <View style={styles.cite}>
      <View>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.text}>{patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Dueño</Text>
        <Text style={styles.text}>{owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>Síntomas</Text>
        <Text style={styles.text}>{sign}</Text>
      </View>
      <View>
        <TouchableHighlight
          underlayColor={THEME.darkDanger}
          onPress={() => deleteAppointment(id)}
          style={styles.deleteButton}>
          <Text style={styles.textDeleteButton}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cite: {
    backgroundColor: THEME.main,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 8,
  },
  label: {
    color: THEME.text,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    color: THEME.text,
    fontSize: 16,
  },
  deleteButton: {
    borderColor: '#eee7',
    borderWidth: 1.5,
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  textDeleteButton: {
    color: THEME.text,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default Cite
