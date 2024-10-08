import React, { useState, useEffect } from 'react';
import { Image, ImageProps, ActivityIndicator, View, StyleSheet, Platform } from 'react-native';

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ uri, style, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {
      setIsLoading(true);
      setError(false);

      Image.prefetch(uri)
        .then(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setError(true);
            setIsLoading(false);
          }
        });
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {isLoading && <ActivityIndicator style={styles.loader} />}
      {!error && (
        <Image
          source={{ uri }}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          style={[
            styles.image,
            style,
            { opacity: isLoading ? 0 : 1 }
          ]}
          {...props}
        />
      )}
      {error && <View style={[styles.errorOverlay, style]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0e0e0',
  },
});

export default React.memo(OptimizedImage);