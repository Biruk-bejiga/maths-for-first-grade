import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const WelcomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleStartLearning = () => {
    navigation.navigate('MainMenu');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F8F9FA',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24
    }}>
      {/* App Title and Mascot */}
      <View style={{ alignItems: 'center', marginBottom: 48 }}>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#2C3E50',
          marginBottom: 16,
          textAlign: 'center'
        }}>
          {t('welcome.title')}
        </Text>
        <Text style={{
          fontSize: 20,
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 24
        }}>
          {t('welcome.subtitle')}
        </Text>
        {/* Mascot placeholder */}
        <View style={{
          width: 96,
          height: 96,
          backgroundColor: '#FFD700',
          borderRadius: 48,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32
        }}>
          <Text style={{ fontSize: 28 }}>🐢</Text>
        </View>
      </View>

      {/* Language Selection */}
      <View style={{ width: '100%', marginBottom: 32 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 24
        }}>
          {t('welcome.selectLanguage')}
        </Text>
        
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 16,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => changeLanguage('am')}
        >
          <View style={{
            width: 32,
            height: 24,
            backgroundColor: '#32CD32',
            borderRadius: 4,
            marginRight: 16
          }}>
            <View style={{ width: '100%', height: 8, backgroundColor: '#FFD700' }}></View>
            <View style={{ width: '100%', height: 8, backgroundColor: '#FF6B6B' }}></View>
          </View>
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#2C3E50'
          }}>
            {t('languages.amharic')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 24,
            padding: 16,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => changeLanguage('om')}
        >
          <View style={{
            width: 32,
            height: 24,
            backgroundColor: '#32CD32',
            borderRadius: 4,
            marginRight: 16
          }}>
            <View style={{ width: '100%', height: 8, backgroundColor: '#FFD700' }}></View>
            <View style={{ width: '100%', height: 8, backgroundColor: '#FF6B6B' }}></View>
          </View>
          <Text style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#2C3E50'
          }}>
            {t('languages.oromo')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start Learning Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FF6B6B',
          borderRadius: 24,
          paddingVertical: 16,
          paddingHorizontal: 32,
          width: '100%',
          alignItems: 'center'
        }}
        onPress={handleStartLearning}
      >
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white'
        }}>
          {t('welcome.startLearning')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

