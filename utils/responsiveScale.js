  import { Dimensions } from 'react-native';

  // Device screen dimensions
  const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

  // Guideline base dimensions from your phone
  const guidelineBaseWidth = 412;
  const guidelineBaseHeight = 886;

  /**
   * A unified scaling function that takes into account both the device's and guideline's dimensions
   * and aspect ratios to provide a proportional size adjustment.
   * 
   * @param {number} size - The base size to scale.
   * @param {string} type - The type of scaling ('width', 'height', or 'font').
   * @param {number} factor - Moderation factor for scaling, default is 0.5.
   * @returns {number} - The scaled size based on the device's screen size.
   */
  const responsiveScale = (size, type = 'font', factor = 0.75) => {
    // Calculate the screen size ratio between the current device and the guideline device
    const widthRatio = deviceWidth / guidelineBaseWidth;
    const heightRatio = deviceHeight / guidelineBaseHeight;
    
    let scalingFactor;

    switch (type) {
      case 'width':
        scalingFactor = widthRatio;
        break;
      case 'height':
        scalingFactor = heightRatio;
        break;
      case 'font':
      default:
        // For font scaling, consider using the smaller of the two ratios to ensure text remains legible
        // and UI elements are proportionally scaled on all devices.
        const minRatio = Math.min(widthRatio, heightRatio);
        scalingFactor = minRatio;
        break;
    }

    // Apply the scaling factor to the size, optionally adjusting for the moderation factor
    const adjustedSize = size * scalingFactor;
    // The moderation factor allows for fine-tuning of the scaling effect
    return size + (adjustedSize - size) * factor;
  };

  export { responsiveScale };
