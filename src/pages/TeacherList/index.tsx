import React, { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';

import { View, Text, ScrollView, Platform } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo, Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { animate, enableAnimation } from '../../utils/Animation';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFiltersVisible, setIsFilterVisible] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedWeekDay, setSelectedWeekDay] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const handleToggleFiltersVisible = useCallback(() => {
    animate();
    setIsFilterVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  useEffect(() => { enableAnimation() }, [false]);


  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: TeacherProps) => {
            return teacher.id;
          }
        )
        setFavorites(favoritedTeachersIds);
      }
    })
  }

  const handleChangeTime = (event: any, selectedValue: Date | undefined) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };

  const showMode = (currentMode: any | undefined) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimePicker = () => {
    showMode('time');
  };

  const formatDate = (time: Date) => {
    const showHours = time.getHours();
    const showMinutes = (time.getMinutes()).toString().padStart(2, "0");
    return `${showHours}:${showMinutes}`;
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleFiltersSubmit = async () => {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject: selectedSubject,
        week_day: selectedWeekDay,
        time: formatDate(time),
      },
    });

    const teacherResults = response.data;

    setTeachers(teacherResults);
    teacherResults.length > 0 ? setIsFilterVisible(false) : setIsFilterVisible(true);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#04D361" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>

            <Text style={styles.label}>Matéria</Text>
            <View style={styles.pickerView}>
              <Entypo
                style={styles.selectArrowPicker}
                name="chevron-small-down"
                size={24}
                color={'#8257E5'}
                pointerEvents="none"
              />
              <Picker
                selectedValue={selectedSubject}
                style={styles.selectPicker}
                onValueChange={(itemValue) => setSelectedSubject(String(itemValue))}
              >
                <Picker.Item color="#C1BCCC" label="Qual a matéria?" value="" />
                <Picker.Item label="Artes" value="Artes" />
                <Picker.Item label="Biologia" value="Biologia" />
                <Picker.Item label="Ed. Física" value="Ed. Física" />
                <Picker.Item label="Português" value="Português" />
                <Picker.Item label="Matemática" value="Matemática" />
                <Picker.Item label="Física" value="Física" />
                <Picker.Item label="História" value="História" />
                <Picker.Item label="Química" value="Química" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.pickerView}>
                  <Entypo
                    style={styles.selectArrowPicker}
                    name="chevron-small-down"
                    size={24}
                    color={'#8257E5'}
                    pointerEvents="none"
                  />
                  <Picker
                    selectedValue={selectedWeekDay}
                    style={styles.selectPicker}
                    onValueChange={(itemValue) => setSelectedWeekDay(String(itemValue))}
                  >
                    <Picker.Item color="#C1BCCC" label="Qual o dia?" value="" />
                    <Picker.Item label="Domingo" value="0" />
                    <Picker.Item label="Segunda-feira" value="1" />
                    <Picker.Item label="Terça-feira" value="2" />
                    <Picker.Item label="Quarta-feira" value="3" />
                    <Picker.Item label="Quinta-feira" value="4" />
                    <Picker.Item label="Sexta-feira" value="5" />
                    <Picker.Item label="Sábado" value="6" />
                  </Picker>
                </View>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>


                <BorderlessButton style={styles.input} onPress={showTimePicker}>
                  <Text>{formatDate(time)}</Text>
                  <Feather name="clock" size={18} color="#8257E5" />
                </BorderlessButton>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={handleChangeTime}
                  />
                )}

              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {teachers.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Filtre pelos melhores</Text>
            <FontAwesome5 name="search" size={24} color="#9C98A6" />
          </View>
        )}

        {teachers.map(
          (teacher: TeacherProps) => {
            return <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          }
        )}
      </ScrollView>
    </View>
  )
}

export default TeacherList;