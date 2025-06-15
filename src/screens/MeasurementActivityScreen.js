import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';

const MeasurementActivityScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Measurement exercises
  const exercises = [
    {
      type: 'length',
      question: 'Which line is longer?',
      options: [
        { id: 'A', length: 60, label: 'Line A' },
        { id: 'B', length: 100, label: 'Line B' }
      ],
      correctAnswer: 'B'
    },
    {
      type: 'height',
      question: 'Which object is taller?',
      options: [
        { id: 'A', height: 80, label: '🌳', name: 'Tree' },
        { id: 'B', height: 120, label: '🏢', name: 'Building' }
      ],
      correctAnswer: 'B'
    },
    {
      type: 'time',
      question: 'What time is shown?',
      clockTime: '3:00',
      options: ['2:00', '3:00', '4:00', '5:00'],
      correctAnswer: '3:00'
    },
    {
      type: 'weight',
      question: 'Which is heavier?',
      options: [
        { id: 'A', label: '🪶', name: 'Feather' },
        { id: 'B', label: '🪨', name: 'Rock' }
      ],
      correctAnswer: 'B'
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

  const renderExerciseContent = () => {
    switch (currentEx.type) {
      case 'length':
        return (
          <View style={{ alignItems: 'center' }}>
            {currentEx.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={{
                  marginVertical: 20,
                  alignItems: 'center',
                  backgroundColor: selectedAnswer === option.id ? '#FFD700' : 'transparent',
                  padding: 10,
                  borderRadius: 12
                }}
                onPress={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
              >
                <Text style={{ fontSize: 18, marginBottom: 8, color: '#2C3E50' }}>
                  {option.label}
                </Text>
                <View style={{
                  width: option.length,
                  height: 8,
                  backgroundColor: '#4A90E2',
                  borderRadius: 4
                }} />
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'height':
        return (
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            height: 150
          }}>
            {currentEx.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={{
                  alignItems: 'center',
                  backgroundColor: selectedAnswer === option.id ? '#FFD700' : 'transparent',
                  padding: 10,
                  borderRadius: 12
                }}
                onPress={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
              >
                <Text style={{ 
                  fontSize: option.height / 2, 
                  height: option.height,
                  textAlignVertical: 'bottom'
                }}>
                  {option.label}
                </Text>
                <Text style={{ fontSize: 16, color: '#2C3E50', marginTop: 8 }}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'time':
        return (
          <View style={{ alignItems: 'center' }}>
            {/* Simple clock representation */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 4,
              borderColor: '#2C3E50',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
              backgroundColor: 'white'
            }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C3E50' }}>
                {currentEx.clockTime}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentEx.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={{
                    margin: 8,
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: selectedAnswer === option ? '#FFD700' : 'white',
                    borderWidth: 2,
                    borderColor: '#E5E7EB'
                  }}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2C3E50' }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'weight':
        return (
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            {currentEx.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={{
                  alignItems: 'center',
                  backgroundColor: selectedAnswer === option.id ? '#FFD700' : 'transparent',
                  padding: 20,
                  borderRadius: 12
                }}
                onPress={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
              >
                <Text style={{ fontSize: 48 }}>
                  {option.label}
                </Text>
                <Text style={{ fontSize: 16, color: '#2C3E50', marginTop: 8 }}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Animated.View style={{ 
      flex: 1, 
      backgroundColor: '#F8F9FA',
      opacity: fadeAnim 
    }}>
      {/* Header */}
      <View style={{
        backgroundColor: '#9B59B6',
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
            {t('menu.measurement')}
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
          {t('menu.measurement')} ({currentExercise + 1}/{exercises.length})
        </Text>

        {/* Question */}
        <Text style={{
          fontSize: 24,
          color: '#2C3E50',
          textAlign: 'center',
          marginBottom: 32
        }}>
          {currentEx.question}
        </Text>

        {/* Exercise Content */}
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
          minHeight: 200
        }}>
          {renderExerciseContent()}
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
        {(currentEx.type === 'time' || showFeedback) && (
          <TouchableOpacity
            style={{
              borderRadius: 24,
              paddingVertical: 16,
              paddingHorizontal: 32,
              alignItems: 'center',
              backgroundColor: (selectedAnswer !== null || showFeedback) ? '#FFD700' : '#E5E7EB'
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
        )}

        {/* Audio Button */}
        <TouchableOpacity style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 48,
          height: 48,
          backgroundColor: '#9B59B6',
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

export default MeasurementActivityScreen;

