import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        cardOpacity.value,
        [0, 50],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        { translateX: interpolate( cardOffset.value, [0, 50], [-70, 0]) }
      ]
    }
  })

  useEffect(() => {
    cardOpacity.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';
    })
    cardOffset.value = withTiming(50, { duration: 1000 }, () => {
      'worklet'
    })
  }, [cardOpacity]);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}