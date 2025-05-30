import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Card as CardType, CardSchema } from '@/lib/schema';
import { useState } from 'react';

interface CardFormProps {
  initialValues?: Partial<CardType>;
  onSubmit: (values: Partial<CardType>) => void;
}

export default function CardForm({ initialValues, onSubmit }: CardFormProps) {
  const [showGMNotes, setShowGMNotes] = useState(!!initialValues?.gmNotes);
  
  // Create a partial schema for the form
  const formSchema = CardSchema.partial().omit({ createdAt: true, updatedAt: true });
  
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialValues?.id || '',
      name: initialValues?.name || '',
      type: initialValues?.type || '',
      habitat: initialValues?.habitat || '',
      category: initialValues?.category || 'Creature',
      tier: initialValues?.tier || 1,
      hp: initialValues?.hp || 10,
      attack: initialValues?.attack || 0,
      defense: initialValues?.defense || 0,
      rawDamage: initialValues?.rawDamage || 0,
      evasion: initialValues?.evasion || 0,
      shield: initialValues?.shield || 0,
      description: initialValues?.description || '',
      imageUrl: initialValues?.imageUrl || '',
      gmNotes: initialValues?.gmNotes || '',
    }
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <Label for="name">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                invalid={!!errors.name}
                {...field}
              />
            )}
          />
          {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="type">Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Input
                id="type"
                invalid={!!errors.type}
                {...field}
              />
            )}
          />
          {errors.type && <FormFeedback>{errors.type.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="habitat">Habitat</Label>
          <Controller
            name="habitat"
            control={control}
            render={({ field }) => (
              <Input
                id="habitat"
                invalid={!!errors.habitat}
                {...field}
              />
            )}
          />
          {errors.habitat && <FormFeedback>{errors.habitat.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Input
                id="category"
                type="select"
                invalid={!!errors.category}
                {...field}
              >
                <option value="Imperial">Imperial</option>
                <option value="Rebel">Rebel</option>
                <option value="Regent">Regent</option>
                <option value="Creature">Creature</option>
              </Input>
            )}
          />
          {errors.category && <FormFeedback>{errors.category.message}</FormFeedback>}
        </FormGroup>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
        <FormGroup>
          <Label for="tier">Tier</Label>
          <Controller
            name="tier"
            control={control}
            render={({ field }) => (
              <Input
                id="tier"
                type="number"
                min={0}
                max={10}
                invalid={!!errors.tier}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.tier && <FormFeedback>{errors.tier.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="hp">HP</Label>
          <Controller
            name="hp"
            control={control}
            render={({ field }) => (
              <Input
                id="hp"
                type="number"
                min={0}
                invalid={!!errors.hp}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.hp && <FormFeedback>{errors.hp.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="attack">Attack</Label>
          <Controller
            name="attack"
            control={control}
            render={({ field }) => (
              <Input
                id="attack"
                type="number"
                min={0}
                invalid={!!errors.attack}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.attack && <FormFeedback>{errors.attack.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="defense">Defense</Label>
          <Controller
            name="defense"
            control={control}
            render={({ field }) => (
              <Input
                id="defense"
                type="number"
                min={0}
                invalid={!!errors.defense}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.defense && <FormFeedback>{errors.defense.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="rawDamage">Raw Damage</Label>
          <Controller
            name="rawDamage"
            control={control}
            render={({ field }) => (
              <Input
                id="rawDamage"
                type="number"
                min={0}
                invalid={!!errors.rawDamage}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.rawDamage && <FormFeedback>{errors.rawDamage.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="evasion">Evasion</Label>
          <Controller
            name="evasion"
            control={control}
            render={({ field }) => (
              <Input
                id="evasion"
                type="number"
                min={0}
                invalid={!!errors.evasion}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.evasion && <FormFeedback>{errors.evasion.message}</FormFeedback>}
        </FormGroup>
        
        <FormGroup>
          <Label for="shield">Shield</Label>
          <Controller
            name="shield"
            control={control}
            render={({ field }) => (
              <Input
                id="shield"
                type="number"
                min={0}
                invalid={!!errors.shield}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
          {errors.shield && <FormFeedback>{errors.shield.message}</FormFeedback>}
        </FormGroup>
      </div>
      
      <FormGroup>
        <Label for="imageUrl">Image URL</Label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <Input
              id="imageUrl"
              invalid={!!errors.imageUrl}
              {...field}
            />
          )}
        />
        {errors.imageUrl && <FormFeedback>{errors.imageUrl.message}</FormFeedback>}
      </FormGroup>
      
      <FormGroup>
        <Label for="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              id="description"
              type="textarea"
              rows={4}
              invalid={!!errors.description}
              {...field}
            />
          )}
        />
        {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
      </FormGroup>
      
      <div className="mb-4">
        <Button 
          type="button" 
          color="secondary" 
          outline 
          size="sm"
          onClick={() => setShowGMNotes(!showGMNotes)}
        >
          {showGMNotes ? 'Hide GM Notes' : 'Add GM Notes'}
        </Button>
      </div>
      
      {showGMNotes && (
        <FormGroup>
          <Label for="gmNotes">GM Notes (Only visible to GMs)</Label>
          <Controller
            name="gmNotes"
            control={control}
            render={({ field }) => (
              <Input
                id="gmNotes"
                type="textarea"
                rows={4}
                className="bg-yellow-50"
                invalid={!!errors.gmNotes}
                {...field}
              />
            )}
          />
          {errors.gmNotes && <FormFeedback>{errors.gmNotes.message}</FormFeedback>}
        </FormGroup>
      )}
      
      <div className="mt-4">
        <Button type="submit" color="primary">
          {initialValues?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
}
