import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const MainMenuScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'numbers',
      title: t('menu.numbers'),
      icon: '🔢',
      color: '#FF8C42',
      screen: 'CountingActivity'
    },
    {
      id: 'addition',
      title: t('activities.addition.title'),
      icon: '➕',
      color: '#32CD32',
      screen: 'AdditionActivity'
    },
    {
      id: 'shapes',
      title: t('menu.shapes'),
      icon: '🔷',
      color: '#FF6B6B',
      screen: 'ShapesActivity'
    },
    {
      id: 'measurement',
      title: t('menu.measurement'),
      icon: '📏',
      color: '#9B59B6',
      screen: 'MeasurementActivity'
    }
  ];

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View style={{
        backgroundColor: '#4A90E2',
        paddingTop: 48,
        paddingBottom: 24,
        paddingHorizontal: 24
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white'
          }}>
            {t('menu.title')}
          </Text>
          <TouchableOpacity style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Grid */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: item.color,
                borderRadius: 24,
                padding: 24,
                marginBottom: 24,
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                minHeight: 160,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
              onPress={() => handleMenuPress(item.screen)}
            >
              <Text style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
                lineHeight: 22
              }}>
                {item.title}
              </Text>
              {/* Progress indicator */}
              <View style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 8,
                height: 8,
                marginTop: 16
              }}>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  height: 8,
                  width: `${Math.random() * 100}%`
                }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16
      }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 4 }}>🏠</Text>
          <Text style={{ fontSize: 12, color: '#2C3E50' }}>{t('navigation.home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 4 }}>📊</Text>
          <Text style={{ fontSize: 12, color: '#2C3E50' }}>{t('navigation.progress')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 4 }}>⚙️</Text>
          <Text style={{ fontSize: 12, color: '#2C3E50' }}>{t('navigation.settings')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainMenuScreen;

