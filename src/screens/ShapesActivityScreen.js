import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const ShapesActivityScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Sample shapes exercise
  const exercise = {
    shape: {
      name: 'circle',
      display: '⭕',
      color: '#FF8C42'
    },
    options: [
      { name: 'square', display: '⬜', color: '#FFD700' },
      { name: 'triangle', display: '🔺', color: '#32CD32' },
      { name: 'rectangle', display: '▬', color: '#FF6B6B' },
      { name: 'circle', display: '⭕', color: '#FF8C42' }
    ]
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === exercise.shape.name;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    // Reset for next question
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    // In a real app, this would load the next exercise
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View style={{
        backgroundColor: '#4A90E2',
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 24
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 20 }}>←</Text>
          </TouchableOpacity>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            flex: 1
          }}>
            {t('activities.shapes.title')}
          </Text>
          {/* Progress indicator */}
          <View style={{
            width: 80,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 8,
            height: 8
          }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 8,
              height: 8,
              width: '50%'
            }} />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
        {/* Instruction */}
        <Text style={{
          fontSize: 24,
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 32
        }}>
          {t('activities.shapes.instruction')}
        </Text>

        {/* Shape Display */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 48,
          marginBottom: 32,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <View style={{
            width: 128,
            height: 128,
            backgroundColor: exercise.shape.color,
            borderRadius: 64,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ fontSize: 64 }}>{exercise.shape.display}</Text>
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#2C3E50',
            marginTop: 16,
            textTransform: 'capitalize'
          }}>
            {t(`activities.shapes.${exercise.shape.name}`)}
          </Text>
        </View>

        {/* Answer Options */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 32
        }}>
          {exercise.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '22%',
                aspectRatio: 1,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                backgroundColor: selectedAnswer === option.name 
                  ? (isCorrect ? '#32CD32' : '#FF6B6B')
                  : 'white',
                borderWidth: selectedAnswer === option.name ? 0 : 2,
                borderColor: '#E5E7EB'
              }}
              onPress={() => !showFeedback && handleAnswerSelect(option.name)}
              disabled={showFeedback}
            >
              <Text style={{ fontSize: 32 }}>{option.display}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text style={{ fontSize: 36, marginBottom: 8 }}>
              {isCorrect ? '😊' : '😔'}
            </Text>
            <Text style={{
              fontSize: 24,
              fontWeight: '600',
              color: isCorrect ? '#32CD32' : '#FF6B6B'
            }}>
              {isCorrect ? t('activities.counting.correct') : t('activities.counting.incorrect')}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showFeedback && (
          <TouchableOpacity
            style={{
              backgroundColor: '#FFD700',
              borderRadius: 24,
              paddingVertical: 16,
              paddingHorizontal: 32,
              alignItems: 'center'
            }}
            onPress={handleNext}
          >
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2C3E50'
            }}>
              {t('activities.counting.next')}
            </Text>
          </TouchableOpacity>
        )}

        {/* Audio Button */}
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 48,
          height: 48,
          backgroundColor: '#4A90E2',
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 20 }}>🔊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShapesActivityScreen;

