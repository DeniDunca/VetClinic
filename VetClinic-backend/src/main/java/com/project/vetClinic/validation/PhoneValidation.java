package com.project.vetClinic.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneValidation implements ConstraintValidator<PhoneConstraint, String> {

    @Override
    public void initialize(PhoneConstraint constraintAnnotation) {}

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext cvc) {
        return phone != null && phone.matches("[0-9]+") && (phone.length() > 9) && (phone.length() < 13);
    }
}
