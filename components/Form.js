import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
} from 'react-native'
import { THEME } from '../Theme'
import DTPicker from 'react-native-modal-datetime-picker'
import sid from 'shortid'

const Form = ({ newCite, setFormActive }) => {
  const [data, setData] = useState({
    patient: '',
    owner: '',
    phone: '',
    sign: '',
  })

  const [dateCite, setDate] = useState('')
  const [timeCite, setTime] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  //Date Picker Functions
  const showDatePicker = () => {
    setDatePickerVisibility(prev => !prev)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(prev => !prev)
  }

  const handleConfirmDate = date => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }
    setDate(date.toLocaleDateString('es-ES', options))
    hideDatePicker()
  }

  // Time Picker Functions

  const showTimePicker = () => {
    setTimePickerVisibility(prev => !prev)
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(prev => !prev)
  }

  const handleConfirmTime = time => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    }
    setTime(time.toLocaleTimeString('es-ES', options))
    hideTimePicker()
  }

  const handleChange = (txt, name) => {
    setData({
      ...data,
      [name]: txt,
    })
  }

  const handlePress = () => {
    if (
      (data.patient !== '' && data.owner !== '' && data.phone !== '',
      data.sign !== '' && dateCite !== '' && timeCite !== '')
    ) {
      const id = sid()
      const fullData = {
        ...data,
        dateCite,
        timeCite,
        id,
      }
      newCite(fullData)
      setFormActive(false)
    } else {
      showAlert()
    }
  }

  const showAlert = () => {
    Alert.alert('Ups...', 'Todos los campos son obligatorios', [{ text: 'Ok' }])
  }

  return (
    <>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={txt => handleChange(txt, 'patient')}
            defaultValue={data.patient}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={txt => handleChange(txt, 'owner')}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="11-8888-8888"
            keyboardType="numeric"
            onChangeText={txt => handleChange(txt, 'phone')}
          />
        </View>
        <View style={styles.picker}>
          <Button title="Seleccionar una fecha" onPress={showDatePicker} />
          <DTPicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
        </View>
        <View style={styles.picker}>
          <Button title="Seleccionar una horario" onPress={showTimePicker} />
          <DTPicker
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            locale="es_ES"
            is24Hour
          />
        </View>
        <Text>
          {dateCite} {dateCite !== '' && timeCite !== '' && 'a las'} {timeCite}
        </Text>
        <View>
          <Text style={styles.label}>Síntomas</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder={`No duerme desde antes de ayer... 😥`}
            onChangeText={txt => handleChange(txt, 'sign')}
          />
        </View>
        <View>
          <TouchableHighlight style={styles.btn} onPress={handlePress}>
            <Text style={styles.btnText}>Agregar</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight style={styles.btnDelete} onPress={handlePress}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: THEME.main,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginVertical: 8,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
    color: THEME.text,
  },

  input: {
    marginVertical: 8,
    height: 50,
    paddingHorizontal: 6,
    borderColor: THEME.border,
    borderWidth: 1,
    borderStyle: 'solid',
    color: THEME.text,
  },

  picker: {
    backgroundColor: 'red',
    color: 'black',
    marginVertical: 8,
  },

  btn: {
    backgroundColor: THEME.success,
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 6,
  },

  btnDelete: {
    borderColor: THEME.border,
    borderWidth: 2,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 6,
  },

  btnText: {
    color: '#eee',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Form
