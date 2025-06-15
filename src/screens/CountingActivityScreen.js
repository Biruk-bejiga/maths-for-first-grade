import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';

const CountingActivityScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Multiple counting exercises
  const exercises = [
    {
      objects: ['⭐', '⭐', '⭐'],
      correctAnswer: 3,
      options: [2, 3, 4, 5, 6],
      type: 'stars'
    },
    {
      objects: ['🍎', '🍎', '🍎', '🍎', '🍎'],
      correctAnswer: 5,
      options: [3, 4, 5, 6, 7],
      type: 'apples'
    },
    {
      objects: ['🔵', '🔵', '🔵', '🔵'],
      correctAnswer: 4,
      options: [2, 3, 4, 5, 6],
      type: 'circles'
    },
    {
      objects: ['🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨'],
      correctAnswer: 7,
      options: [5, 6, 7, 8, 9],
      type: 'squares'
    }
  ];

  const currentEx = exercises[currentExercise];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      const correct = selectedAnswer === currentEx.correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
      if (correct) {
        setScore(score + 1);
      }
      
      // Animate feedback
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Show completion screen or go back to menu
      navigation.goBack();
    }
  };

  const getFeedbackMessage = () => {
    if (isCorrect) {
      const messages = ['feedback.excellent', 'feedback.great', 'feedback.good'];
      return t(messages[Math.floor(Math.random() * messages.length)]);
    }
    return t('feedback.tryAgain');
  };

  return (
    <Animated.View style={{ 
      flex: 1, 
      backgroundColor: '#F8F9FA',
      opacity: fadeAnim 
    }}>
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
            {t('activities.counting.title')}
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
              width: `${((currentExercise + 1) / exercises.length) * 100}%`
            }} />
          </View>
        </View>
        
        {/* Score */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {t('navigation.progress')}: {score}/{exercises.length}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
        {/* Exercise Counter */}
        <Text style={{
          fontSize: 18,
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 16
        }}>
          {t('activities.counting.exercises.countStars')} ({currentExercise + 1}/{exercises.length})
        </Text>

        {/* Instruction */}
        <Text style={{
          fontSize: 24,
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 32
        }}>
          {t('activities.counting.instruction')}
        </Text>

        {/* Objects to Count */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 32,
          marginBottom: 32,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          minHeight: 150
        }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {currentEx.objects.map((obj, index) => (
              <Animated.Text 
                key={index} 
                style={{
                  fontSize: 36,
                  margin: 8,
                  transform: [{
                    scale: showFeedback && isCorrect ? 1.2 : 1
                  }]
                }}
              >
                {obj}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Answer Options */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 32,
          flexWrap: 'wrap'
        }}>
          {currentEx.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                margin: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedAnswer === option ? '#4A90E2' : 'white',
                borderWidth: selectedAnswer === option ? 0 : 2,
                borderColor: '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2
              }}
              onPress={() => handleAnswerSelect(option)}
              disabled={showFeedback}
            >
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: selectedAnswer === option ? 'white' : '#2C3E50'
              }}>
                {option}
              </Text>
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
              color: isCorrect ? '#32CD32' : '#FF6B6B',
              textAlign: 'center'
            }}>
              {getFeedbackMessage()}
            </Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={{
            borderRadius: 24,
            paddingVertical: 16,
            paddingHorizontal: 32,
            alignItems: 'center',
            backgroundColor: selectedAnswer !== null ? '#FFD700' : '#E5E7EB'
          }}
          onPress={showFeedback ? handleNext : handleCheckAnswer}
          disabled={selectedAnswer === null && !showFeedback}
        >
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2C3E50'
          }}>
            {showFeedback ? 
              (currentExercise < exercises.length - 1 ? t('activities.counting.next') : t('navigation.home')) 
              : t('activities.counting.checkAnswer')
            }
          </Text>
        </TouchableOpacity>

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
    </Animated.View>
  );
};

export default CountingActivityScreen;

