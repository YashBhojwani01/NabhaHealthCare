import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

const SignupPharmacist: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pharmacyName: '',
    ownerName: '',
    phone: '',
    email: '',
    password: '',
    gstOrLicense: '',
    address: ''
  });
  const [agree, setAgree] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    localStorage.setItem('auth_user', JSON.stringify({ ...form, role: 'pharmacist' }));
    navigate('/pharmacist');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Pharmacist Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                <Input id="pharmacyName" name="pharmacyName" value={form.pharmacyName} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" name="ownerName" value={form.ownerName} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" value={form.password} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="gstOrLicense">GST / Drug License No</Label>
                <Input id="gstOrLicense" name="gstOrLicense" value={form.gstOrLicense} onChange={onChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={form.address} onChange={onChange} required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(!!v)} />
                <Label htmlFor="agree" className="text-sm">I agree to the Terms & Privacy Policy</Label>
              </div>
              <Button type="submit" className="w-full" disabled={!agree}>Create Account</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPharmacist;



