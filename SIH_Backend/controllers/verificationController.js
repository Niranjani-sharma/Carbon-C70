import axiosClient from '../../SIH_Frontend/src/axiosClient';
import verificationSchema from '../verificationSchema';

const verificationController = {
  submitVerification: async (verificationData) => {
    try {
      const response = await axiosClient.post('/api/verification/submit', verificationData);
      return response.data;
    } catch (error) {
      console.error('Error submitting verification:', error);
      throw error;
    }
  },

  getVerificationStatus: async (userId) => {
    try {
      const response = await axiosClient.get(`/api/verification/status/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting verification status:', error);
      throw error;
    }
  },

  // Add more verification-related functions as needed
};

export default verificationController;