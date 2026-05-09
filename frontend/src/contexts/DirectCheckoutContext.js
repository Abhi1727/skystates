import React, { createContext, useContext, useState, useEffect } from 'react';

const DirectCheckoutContext = createContext();

export const useDirectCheckout = () => {
  const context = useContext(DirectCheckoutContext);
  if (!context) {
    throw new Error('useDirectCheckout must be used within a DirectCheckoutProvider');
  }
  return context;
};

export const DirectCheckoutProvider = ({ children }) => {
  const [program, setProgram] = useState(null);

  // Load program from localStorage on mount
  useEffect(() => {
    const savedProgram = localStorage.getItem('skystates_program');
    if (savedProgram) {
      try {
        const parsedProgram = JSON.parse(savedProgram);
        // Validate program data before setting it
        if (parsedProgram && parsedProgram.name && parsedProgram.price && !isNaN(parseFloat(parsedProgram.price.toString().replace('$', '').replace(',', '')))) {
          setProgram(parsedProgram);
        } else {
          console.warn('Invalid program data found in localStorage, removing it');
          localStorage.removeItem('skystates_program');
        }
      } catch (error) {
        console.error('Error parsing program from localStorage:', error);
        localStorage.removeItem('skystates_program');
      }
    }
  }, []);

  // Save program to localStorage whenever it changes
  useEffect(() => {
    if (program) {
      localStorage.setItem('skystates_program', JSON.stringify(program));
    } else {
      localStorage.removeItem('skystates_program');
    }
  }, [program]);

  const setProgramForCheckout = (programData) => {
    // Add metadata to the program
    const programWithMetadata = {
      ...programData,
      id: Date.now() + Math.random(), // Unique ID
      addedAt: new Date().toISOString()
    };

    setProgram(programWithMetadata);
    return true;
  };

  const clearProgram = () => {
    setProgram(null);
  };

  const getProgramTotal = () => {
    if (!program) return 0;
    
    // Handle different price formats: $2999.00, 2999.00, 2999, etc.
    const priceStr = program.price.toString().replace('$', '').replace(',', '');
    const price = parseFloat(priceStr);
    
    // Validate price
    if (isNaN(price) || price < 0) {
      console.warn('Invalid price detected:', program.price, program.name);
      return 0;
    }
    
    return price;
  };

  const isCurrentProgram = (programName, programType) => {
    return program && program.name === programName && program.type === programType;
  };

  const value = {
    program,
    setProgram: setProgramForCheckout,
    clearProgram,
    getProgramTotal,
    isCurrentProgram
  };

  return (
    <DirectCheckoutContext.Provider value={value}>
      {children}
    </DirectCheckoutContext.Provider>
  );
};

export default DirectCheckoutContext;
