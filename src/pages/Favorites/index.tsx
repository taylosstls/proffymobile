import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Image, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';
import favoritoIcon from '../../assets/images/icons/favorito.png';

import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [totalFavorited, setTotalFavorited] = useState(0);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersLength = favoritedTeachers.length;

        setFavorites(favoritedTeachers);
        setTotalFavorited(favoritedTeachersLength);
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos"
        headerRight={(
          <>
            <Image style={styles.favoriteIcon} source={favoritoIcon} resizeMode="contain" />
            <Text style={styles.favoriteText}>
              {totalFavorited} Proffy{
                totalFavorited > 1 ? 's' : ''}
            </Text>
          </>
        )} />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum proffy favoritado</Text>
            <FontAwesome5 name="sad-cry" size={24} color="#9C98A6" />
          </View>
        )}
        {favorites.map(
          (teacher: TeacherProps) => {
            return <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
            />
          }
        )}
      </ScrollView>
    </View>
  )
}

export default Favorites;